---
title: "Shamir's Secret Sharing"
date: 2026-08-01
description: "I came across Shamir's Secret Sharing (SSS) while exploring cryptographic key management. Initially, I thought it was just another encryption algorithm. After reading the original paper and digging into the mathematics behind it, I realized it is something entirely different."
tags:
  - cryptography
  - security
layout: layouts/post.njk
permalink: "/posts/{{ page.fileSlug }}/"
draft: true
---


> **Purpose of these notes**
>
> These notes are for my future self. They are not meant to be a complete explanation of the algorithm, but rather a record of how I understood the concept. Hopefully, if I revisit this months or years later, I can rebuild the intuition without starting from scratch.


## The Problem Shamir's Secret Sharing Solves

Suppose I have a highly sensitive secret, for example:

* The master key for a production environment.
* The recovery phrase for a cryptocurrency wallet.
* A root encryption key.

There are two obvious but flawed approaches.

**Approach 1: Give the secret to one person.**

This creates a single point of failure.

If that person loses the key, forgets it, or becomes unavailable, the secret is gone.

**Approach 2: Give the secret to everyone.**

Now there is no single point of failure, but security is greatly weakened because every participant has full access.

Neither approach is ideal.

The real requirement is usually something like:

> Any **3 out of 5** trusted people should be able to recover the secret, but **2 or fewer** should learn absolutely nothing.

This is exactly the problem that Shamir's Secret Sharing solves.

What fascinated me is that the solution is not based on a complicated cryptographic primitive, it is built on a simple mathematical concept: **polynomials**.


## Building the Foundation: Polynomials

Before understanding Shamir's algorithm, I needed to understand the mathematics it relies on.

A polynomial is simply an algebraic expression.

Some examples are:

```text
f(x) = x + 3
f(x) = x² + 2x + 1
f(x) = 3x³ - x + 5
```

A useful way to think about a polynomial is as a function or a machine.

Give it an input value `x`, and it produces an output value `y`.

For example,

```text
f(x) = 1234 + 7x + 9x²
```

If I substitute different values for `x`:

```text
f(1) = 1234 + 7 + 9 = 1250
f(2) = 1234 + 14 + 36 = 1284
f(3) = 1234 + 21 + 81 = 1336
```

This gives me three coordinate points:

```text
(1, 1250)
(2, 1284)
(3, 1336)
```

Every one of these points lies on the same polynomial.

At this stage, this doesn't seem related to cryptography at all. It just looks like ordinary algebra.


### What I Realized

The polynomial itself is **not** the secret.

At this point, it is simply a mathematical object that produces points.

The important observation is that **multiple points can all originate from the same polynomial**, and if I know the polynomial, I can generate as many points as I want.

I didn't yet understand why this mattered, but it became clear in the next step.


## Polynomial Interpolation

Now imagine someone hands me only these three points:

```text
(1, 1250)
(2, 1284)
(3, 1336)
```

They don't tell me the equation that generated them.

The question becomes:

> Can I reconstruct the original polynomial?

Surprisingly, yes.

This process is called **polynomial interpolation**.

Since I know the points came from a degree-2 polynomial, I can assume the equation has the form:

```text
f(x) = ax² + bx + c
```

Using the three points, I can form three equations.

For the point `(1,1250)`:

```text
a + b + c = 1250
```

For `(2,1284)`:

```text
4a + 2b + c = 1284
```

For `(3,1336)`:

```text
9a + 3b + c = 1336
```

Now I solve these equations.

Subtract the first equation from the second:

```text
3a + b = 34
```

Subtract the second equation from the third:

```text
5a + b = 52
```

Subtract these two new equations:

```text
2a = 18
a = 9
```

Substitute `a` back:

```text
3 × 9 + b = 34
27 + b = 34
b = 7
```

Finally,

```text
9 + 7 + c = 1250
c = 1234
```

The reconstructed polynomial becomes:

```text
f(x) = 9x² + 7x + 1234
```

If I evaluate the polynomial at `x = 0`:

```text
f(0) = 1234
```

The constant term appears naturally.

That number is going to become extremely important.


### What Clicked for Me

Initially, interpolation just looked like another algebra problem.

Then I realized something fundamental:

**Interpolation is not supporting Shamir's Secret Sharing, it *is* the mechanism that reconstructs the secret.**

Without interpolation, the algorithm simply wouldn't work.

The polynomial is reconstructed from a sufficient number of points, and once the polynomial is known, evaluating it at `x = 0` reveals the original secret.

That observation connected the mathematics to the cryptographic idea.


## Hiding the Secret Inside a Polynomial

Instead of storing the secret directly,

```text
Secret = 1234
```

Shamir's idea is to embed the secret into the constant term of a randomly generated polynomial.

For example,

```text
f(x) = 1234 + 7x + 9x²
```

Here:

* `1234` is the secret.
* `7` and `9` are randomly chosen coefficients.

The random coefficients are important because they ensure there are infinitely many possible polynomials that could contain the same secret.

Now evaluate the polynomial at different values of `x`:

```text
Alice   → (1, 1250)
Bob     → (2, 1284)
Charlie → (3, 1336)
```

Instead of distributing the secret itself, distribute these points.

Each participant receives only one point.

Nobody knows the polynomial.

Nobody knows the secret.

Each person only knows their own share.

This is the point where the algorithm stopped looking like algebra and started looking like cryptography.


### What I Realized

The secret isn't being encrypted.

Nothing is being scrambled or transformed into ciphertext.

Instead, the secret is **hidden** inside a mathematical relationship.

Each participant receives a piece of that relationship.

Only when enough pieces are combined, can deduce the original polynomial and therefore the secret needs be reconstructed.

This distinction is subtle, but it completely changed how I think about Shamir's Secret Sharing.

It is not an encryption algorithm.

It is a **secret distribution algorithm** built on the mathematics of polynomial interpolation.


## Why Two Shares Are Not Enough

At first, I assumed that if each participant has a piece of the secret, then combining "most" of the pieces should gradually reveal information.

That assumption is wrong.

One of the most elegant properties of Shamir's Secret Sharing is that **having fewer than the required number of shares provides no useful information about the secret**.

This isn't because the missing information is difficult to compute.

It's because there are infinitely many possible polynomials that fit the available points.

Suppose I only know these two shares:

```text
(1, 1250)
(2, 1284)
```

I know these points belong to some quadratic polynomial, but I don't know which one.

The missing point could produce:

```text
f(x) = 9x² + 7x + 1234
```

or

```text
f(x) = 5x² + 19x + 1226
```

or infinitely many other quadratic polynomials.

Every one of those polynomials passes through the two known points, but each one has a different value at `x = 0`.

Since

```text
Secret = f(0)
```

the secret itself could be almost anything.

This was initially counterintuitive because I kept thinking:

> "Surely having two out of three shares must narrow down the possibilities."

Mathematically, it doesn't.

The missing point completely changes which polynomial is valid.

Without that final point, the constant term cannot be uniquely determined.


### What I Realized

The shares themselves don't contain partial pieces of the secret.

Each share is simply one point on an unknown polynomial.

Until enough points are available to uniquely reconstruct that polynomial, the secret remains completely hidden.

This is why the algorithm provides information-theoretic security rather than relying on computational hardness.

Unlike RSA, there is no difficult mathematical problem to solve.

There simply isn't enough information.


## Why Three Shares Are Enough

Now consider having all three shares.

```text
(1,1250)
(2,1284)
(3,1336)
```

Everything changes.

Three distinct points uniquely determine one quadratic polynomial.

Using polynomial interpolation, I recover

```text
f(x)=9x²+7x+1234
```

Once I know the polynomial, recovering the secret becomes trivial.

Evaluate

```text
f(0)
```

and obtain

```text
1234
```

The secret isn't hidden anymore because the polynomial itself has been reconstructed.


### What Clicked for Me

The threshold isn't an arbitrary number.

It is directly related to the degree of the polynomial.

If the polynomial has degree `d`, then I need exactly

```text
d + 1
```

points to reconstruct it.

That immediately explains why a **3-of-5** secret sharing scheme uses a quadratic polynomial.

Similarly,

* 2-of-n uses a linear polynomial.
* 4-of-n uses a cubic polynomial.
* 5-of-n uses a fourth-degree polynomial.

The threshold and the polynomial degree are fundamentally linked.


## Generalizing the Idea

The previous example used a quadratic polynomial because it made the arithmetic easy to follow.

More generally:

For a threshold of **k** participants, construct a polynomial of degree

```text
k - 1
```

For example,

```text
3-of-5
↓
Degree 2 polynomial
```

```text
5-of-8
↓
Degree 4 polynomial
```

```text
10-of-20
↓
Degree 9 polynomial
```

Generate as many shares as required by evaluating the polynomial at different values of `x`.

Every participant receives one point.

Recovery only becomes possible when at least **k** points are available.


### My Mental Model

The way I now visualize the algorithm is:

```text
Choose secret
↓
Hide it as f(0)
↓
Generate random polynomial
↓
Evaluate polynomial at different x values
↓
Distribute points
↓
Collect enough points
↓
Interpolate polynomial
↓
Recover f(0)
```

This flow is much easier to remember than memorizing equations.


## What If the Secret Is a String?

One question I had while learning was:

> What if the secret isn't a number?

For example,

```text
"HELLO"
```

or

```text
"MyProductionPassword"
```

A polynomial works with numbers, not text.

So the obvious answer seems to be:

```text
Text
↓
Bytes
↓
Integer
↓
Polynomial
```

Technically, this works.

Any piece of data can eventually be represented as numbers.

However, this isn't how Shamir's Secret Sharing is usually used in practice.


## What Actually Happens in Real Systems

Modern cryptographic systems almost always use **symmetric encryption** for protecting data because it is fast.

A common workflow is:

```text
Plaintext
↓
AES Encryption
↓
Ciphertext
```

The difficult part is protecting the AES key.

This is where Shamir's Secret Sharing fits.

Instead of sharing the encrypted message itself, only the AES key is shared.

The complete flow becomes:

```text
Generate random AES key
↓
Encrypt message using AES
↓
Split AES key using Shamir's Secret Sharing
↓
Distribute shares
↓
Recover AES key
↓
Decrypt message
```

This answered one of my biggest questions.

Shamir's Secret Sharing isn't usually protecting the data.

It is protecting **the key that protects the data**.

That distinction makes much more sense because encryption keys are small, fixed-size values that are ideal for mathematical operations like polynomial evaluation.


### Connection to Something I Already Knew

While reading about this, I realized it closely resembles **envelope encryption**, which I had used before.

In envelope encryption:

```text
Message
↓
AES Encryption
↓
AES Key
↓
Encrypt AES key using RSA or ECC
```

In Shamir's Secret Sharing:

```text
Message
↓
AES Encryption
↓
AES Key
↓
Split AES key into shares
```

The encrypted message remains exactly the same.

Only the method used to protect the AES key changes.

That comparison immediately helped me understand where Shamir fits in the larger cryptographic ecosystem.

I stopped thinking of it as "another encryption algorithm" and instead started thinking of it as **another strategy for key management**.


## Real-World Applications

After understanding the mathematics, I started noticing how frequently this idea appears in real systems.

Some common applications include:

* Cryptocurrency wallet recovery.
* Enterprise disaster recovery.
* Distributed key management.
* Threshold access to production secrets.
* Multi-party authorization systems.
* Hardware Security Modules (HSMs).
* Backup and recovery systems where no single administrator should possess the complete key.

The common theme is always the same.

Sensitive data is encrypted using a symmetric algorithm like AES.

The encryption key is then protected using Shamir's Secret Sharing so that cooperation between multiple trusted participants becomes necessary.


## Why the Previous Examples Are Simplified

Everything I've learned so far uses ordinary integers.

For example,

```text
f(x) = 1234 + 7x + 9x²
```

and evaluating the polynomial is straightforward.

This is a great way to understand the intuition behind the algorithm.

However, while reading the original paper, I noticed that none of the actual mathematics is performed using ordinary integer arithmetic.

Instead, every operation happens inside something called a **finite field**.

Initially, I wondered:

> If the normal integer example already works, why introduce another mathematical system?

That question led me down another rabbit hole.


## Why Ordinary Integer Arithmetic Isn't Enough

Polynomial interpolation requires more than addition and multiplication.

It also requires **division**.

For example, if I eventually use Lagrange interpolation to reconstruct the polynomial, I encounter expressions like

```text
1 / (x₂ - x₁)
```

In ordinary integers, division is problematic.

Examples:

```text
7 / 2 = 3.5
```

```text
5 / 3 = 1.666...
```

The results are no longer integers.

If the secret is supposed to remain within a well-defined mathematical system, allowing fractions creates unnecessary complications.

Cryptographic algorithms need arithmetic where:

* Addition is always valid.
* Subtraction is always valid.
* Multiplication is always valid.
* Division (except by zero) is always valid.
* Every operation stays inside the same mathematical system.

This is exactly what a **field** provides.


## What Is a Field?

A field is a set of numbers together with arithmetic operations that satisfy certain mathematical properties.

The important takeaway for me isn't the formal definition.

The important idea is:

> Every non-zero element has a multiplicative inverse.

That single property guarantees that division is always possible.

Instead of thinking

```text
a / b
```

I can think

```text
a × b⁻¹
```

where

```text
b × b⁻¹ = 1
```

This is the reason interpolation works cleanly inside a field.


## Finite Fields

A finite field is simply a field containing a finite number of elements.

Instead of having infinitely many integers, I work inside a limited mathematical universe.

The original Shamir paper performs all computations inside a finite field.

The field is usually written as

```text
GF(p)
```

where

```text
p
```

is a prime number.

Every calculation is performed **modulo p**.

That means numbers wrap around after reaching `p`.

For example, if

```text
p = 17
```

then

```text
20 mod 17 = 3
```

and

```text
35 mod 17 = 1
```

Every coefficient, every share, and every interpolation step remains inside this finite field.

Nothing ever escapes it.

This guarantees that the arithmetic behaves consistently.


## Why Does the Modulus Have to Be Prime?

One question I kept asking was:

> Why specifically choose a prime number?

The answer became much clearer after studying finite fields.

If the modulus is prime:

* Every non-zero number has a multiplicative inverse.
* Division is always possible.
* Interpolation always works.

If the modulus is not prime, some numbers no longer have inverses.

Once division starts failing, polynomial interpolation can also fail.

So the prime modulus isn't an implementation detail.

It is a mathematical requirement.


## GF(p) vs GF(2⁸)

While exploring finite fields, I encountered another notation:

```text
GF(2⁸)
```

At first, I assumed this was simply another way of writing the same thing.

It isn't.

These are two different finite fields.

### GF(p)

* Elements are integers.
* Arithmetic uses modular arithmetic.
* Commonly used in Shamir's Secret Sharing.

### GF(2⁸)

* Elements are bytes.
* Addition becomes XOR.
* Multiplication uses polynomial arithmetic followed by reduction.
* Widely used inside AES.

Although both are finite fields, the arithmetic is completely different.

That explained why AES documentation kept mentioning polynomial arithmetic while Shamir examples mostly discussed modular arithmetic.

The underlying mathematical idea is the same.

The implementation is different.


## Connection to AES

This was another interesting realization.

AES does not use ordinary integer arithmetic either.

Instead,

```text
Byte
↓
Element of GF(2⁸)
↓
Finite field arithmetic
```

Operations like MixColumns rely heavily on finite-field multiplication.

Although AES and Shamir solve different problems, both depend on the same mathematical foundation:

> Carefully designed arithmetic inside finite fields.

Understanding finite fields therefore helps explain much more than just Shamir's Secret Sharing.


## Practical Implementation Notes

If I were implementing Shamir's Secret Sharing myself, the overall workflow would look like this:

```text
Choose secret(AES Key)
↓
Choose threshold k
↓
Generate random coefficients
↓
Construct polynomial
↓
Evaluate polynomial
↓
Generate shares
↓
Store or distribute shares
↓
Collect threshold shares
↓
Use Lagrange interpolation
↓
Recover secret
```

The mathematics is elegant.

The engineering challenges are different.

Things to think about include:

* Secure random number generation.
* Choosing an appropriate finite field.
* Protecting shares during storage.
* Authenticating shares.
* Preventing accidental duplication.
* Handling corrupted or missing shares.
* Constant-time implementations to avoid side-channel attacks.

These concerns are outside the mathematical algorithm itself, but they matter in production systems.


## Things That Surprised Me

There were several ideas that completely changed my understanding.

### 1. Shamir's Secret Sharing is not encryption.

This was my biggest misconception.

Nothing is encrypted.

The secret is mathematically hidden inside a polynomial.

### 2. The mathematics is simpler than I expected.

Before studying the algorithm, I imagined advanced cryptographic mathematics.

Instead, the core idea depends on concepts I had already learned years ago:

* Polynomials
* Coordinate points
* Solving simultaneous equations
* Polynomial interpolation

The cleverness lies in combining these concepts.

### 3. Shares Are Just Points

I initially imagined each share as containing some encrypted fragment of the secret.

Instead, every share is simply:

```text
(x, y)
```

Nothing more.

That simplicity is probably my favorite part of the algorithm.

### 4. The Secret Lives at f(0)

This was the moment where everything finally clicked.

The polynomial exists only to hide

```text
f(0)
```

Every other point is simply a way of reconstructing that hidden value later.

### 5. Protect the Key, Not the Data

Another misconception I had was assuming Shamir would somehow split an encrypted file.

Instead, almost every practical system does this:

```text
Encrypt Data
↓
AES Key
↓
Split AES Key
```

Once I connected this to envelope encryption, the practical purpose became much clearer.


## Things I Still Want to Learn

Even though I now understand the core algorithm, there are still several topics worth exploring.

### Mathematics

* Derive Lagrange interpolation from first principles.
* Understand finite-field arithmetic more deeply.
* Study why interpolation always works inside GF(p).

### Cryptography

* Threshold signatures.
* Distributed key generation.
* Secret resharing.
* Verifiable Secret Sharing (VSS).
* Proactive Secret Sharing.

### Engineering

* Implement Shamir's Secret Sharing from scratch in Go.
* Study production implementations.
* Learn how HSMs and cloud KMS services use threshold cryptography.


## Key Takeaways

If I had to summarize everything into a few points, they would be:

* Shamir's Secret Sharing is **secret sharing**, not encryption.
* The secret is embedded as the constant term of a random polynomial.
* Shares are simply points on that polynomial.
* The threshold determines the polynomial degree.
* Reconstruction is performed using polynomial interpolation.
* Real implementations perform all arithmetic inside finite fields.
* Most systems use Shamir to protect encryption keys rather than encrypted data.
* The elegance of the algorithm comes from applying familiar mathematics in a clever way.


## References

### Primary Reference

Adi Shamir.
**"How to Share a Secret" (1979)**
https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf

This is the original paper that introduced Shamir's Secret Sharing. Reading the paper after understanding the intuition made it much easier to appreciate the mathematical formulation.

