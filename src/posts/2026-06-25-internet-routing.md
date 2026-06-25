---
title: "Demystifying the Internet: DNS, BGP, VPNs, and Proxies Explained"
date: 2026-06-25
description: "A comprehensive guide to understanding how your device navigates the complex world of internet routing, and how VPNs and Proxies change the rules of the game."
tags:
  - privacy
  - network
layout: layouts/post.njk
permalink: "/posts/{{ page.fileSlug }}/"
draft: false
---

# Demystifying the Internet: DNS, BGP, VPNs, and Proxies Explained

Have you ever wondered what exactly happens when you type a website name into your phone? How does your device know where to go, and who is watching along the way? 

If the internet were a giant global road trip, **DNS** tells you the exact address of your destination, and **BGP** tells your car which highways to take to get there. But the journey gets a lot more interesting when we introduce tools like VPNs and Proxies into the mix. Let's break down the hidden mechanics of the internet.

---

## 1. DNS: The Internet's Phonebook

Humans read domain names (like `netflix.com`), but computers read IP addresses (like `54.237.1.1`). **DNS (Domain Name System)** is the phonebook that translates human language into machine language. 

When you request a website, your phone first asks a DNS server for the IP address. Once the DNS server hands over the IP, its job is entirely done.

![DNS Resolution Diagram Placeholder - Insert DNS_Resolution.drawio here]

---

## 2. BGP and Autonomous Systems: The Global Map

Once your phone has the IP address, it needs to find a path to get there. This is where **BGP (Border Gateway Protocol)** comes in. BGP is the "GPS" of the internet.

However, the internet isn't just one big network; it's a collection of thousands of smaller networks called **Autonomous Systems (AS)**. 
* An AS is typically a large Internet Service Provider (ISP), a tech giant like Google, or a major university. 
* Every AS controls specific blocks of IP addresses (CIDR blocks). 
* These networks physically connect and exchange data at secure data centers known as **Points of Presence (PoPs)**.

BGP is the language these Autonomous Systems use to talk to each other, negotiating the fastest route across different networks to get your data to its final destination.

![BGP Routing Diagram Placeholder - Insert BGP_Routing.drawio here]

### Where does your phone fit in?
Your phone is an "End Node." It sits at the very edge of your ISP's network. Your phone doesn't speak BGP or know the internet map—it just hands its data to your cell tower or router and says, *"Deliver this to Netflix, please."*

---

## 3. The Privacy Leak: SNI and What Your ISP Sees

A common misconception is that changing your DNS settings hides your browsing from your ISP. **It doesn't.**

Even if your DNS request is encrypted, your ISP still physically routes your data. When your phone connects to a website, it sends an initial handshake called a "Client Hello." To make sure it connects to the right service, this handshake includes the **Server Name Indication (SNI)**—the exact name of the website you want—in plain text. 

Your ISP acts like the postal worker carrying your mail. Even if the letter inside is encrypted (HTTPS), the ISP can easily read the SNI on the envelope to see exactly where you are going.

---

## 4. VPNs: The Armored Truck

If standard web browsing is like driving a glass car where everyone can see you, a **VPN (Virtual Private Network)** puts your data inside a windowless, armored truck.

When you use a VPN:
1. The app encrypts all your traffic *before* it leaves your phone.
2. Your ISP only sees an encrypted stream of data heading to the VPN server's IP address. They cannot read your SNI, DNS requests, or final destination.
3. Once the data reaches the VPN server (which is often hosted in a Datacenter AS), the VPN decrypts it and uses **its own BGP routing** to reach the final website.

By using a VPN, you are essentially firing your home ISP from handling the final delivery and hiring the VPN's Datacenter AS to do the routing instead.

![VPN Connection Diagram Placeholder - Insert VPN_Connection.drawio here]

---

## 5. Proxies: The Personal Assistant

While a VPN encrypts your entire device's connection, a **Proxy Server** is usually an app-specific middleman. Think of a proxy like a personal assistant: you tell them what you want, they go to the store to get it, and they bring it back to you. The store only ever sees the assistant.

Unlike VPNs, standard proxies often don't use heavy encryption. Your ISP can still read your traffic on its way to the proxy server. However, just like a VPN, once your data reaches the proxy, the proxy takes over the BGP routing for the rest of the journey.

![Proxy Connection Diagram Placeholder - Insert Proxy_Connection.drawio here]

---

## Putting It All Together

From the moment you hit "search," your data undergoes an incredible journey. It consults the global phonebook, jumps onto your ISP's local roads, negotiates global BGP highways, and potentially dips into encrypted tunnels or proxy middlemen before finally streaming your favorite show. 

Understanding this architecture is the first step in taking back control of your digital privacy!

![High-Level Architecture Diagram Placeholder - Insert HighLevel_Architecture.drawio here]
