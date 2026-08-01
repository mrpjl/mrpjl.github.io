---
title: "Demystifying Internet Routing"
date: 2026-06-25
description: "Ever wondered how your cell phone actually reaches Netflix, or why changing your DNS doesn't hide your internet history from your ISP? In this comprehensive guide, we strip away the jargon to explore the hidden plumbing of the internet—from DNS and BGP to the real privacy mechanics of VPNs and proxy servers."
tags:
  - privacy
  - Network
layout: layouts/post.njk
permalink: "/posts/{{ page.fileSlug }}/"
draft: false
---

## Introduction: The Internet Road Trip

If the internet were a giant road trip, **DNS** is the directory that tells you the exact address of your destination, and **BGP** is the GPS that tells your car which highways to take to get there. But what happens when you want to travel in secret? What highways are you actually driving on?

In this post, we are going to dive deep into how these systems work together, answer some of the most common questions about internet infrastructure, and explore how privacy tools like VPNs and Proxies manipulate these rules to hide your tracks.

---

## Part 1: The Core Infrastructure (DNS vs. BGP)

Before we talk about privacy, we need to understand the two fundamental pillars of internet navigation.

### What is DNS (Domain Name System)?
DNS is the "phonebook" of the internet. Humans type in domain names (like `google.com`), but computers talk in IP addresses (like `192.168.1.1`). DNS simply translates human-readable names into machine-readable IP addresses. 

### What is BGP (Border Gateway Protocol)?
BGP is the routing protocol of the internet. Once you have the IP address from DNS, BGP figures out the fastest physical path across the global maze of internet cables to get your data to that IP address.

**Similarities:**
* Both are absolutely critical internet infrastructure (Application Layer).
* Both are globally distributed systems without a single central server.
* Both are vulnerable to malicious routing (DNS spoofing and BGP hijacking).

**Differences:**
* **Purpose:** DNS resolves names; BGP maps physical network routes.
* **Users:** End-user devices use DNS; Enterprise routers and Internet Service Providers (ISPs) use BGP.

![DNS Resolution](/assets/images/posts/demystifying-internet-routing/DNS_Resolution.drawio.svg)

---

## Part 2: Autonomous Systems (AS) and the Edge

To understand BGP, you have to understand the map it reads. BGP doesn't route traffic router-by-router; it routes traffic network-by-network. These networks are called **Autonomous Systems (AS)**.

### Is an AS just a cluster of public IP addresses?
Not quite. The actual blocks of public IP addresses are called **CIDR Blocks** (the territory). The **Autonomous System (AS)** is the organization (like AT&T, Comcast, or Google) that owns the physical routers and network infrastructure. The AS announces to the rest of the world, *"I am the authority for these CIDR blocks. Send traffic for them through me."* Every AS has a unique identifier called an **ASN (Autonomous System Number)**. BGP negotiates the paths between these ASNs.

### Where do these Autonomous Systems physically connect?
They connect at **Points of Presence (PoPs)**. A PoP is a physical data center where different networks (like Netflix's AS and Comcast's AS) run their fiber-optic cables into shared networking equipment to exchange data. This physical meeting ground is called *peering*.

### Where does your cell phone fit into this?
Your mobile carrier or home ISP is an Autonomous System. Your cell phone sits at the absolute outermost edge of this AS. 
* Your phone does **not** speak BGP.
* It dynamically "borrows" an IP address from the ISP's CIDR blocks.
* It is a pure "end node" consumer. It just hands data to the local cell tower (the Default Gateway) and relies on the ISP's core routers to navigate the internet.

![BGP Routing](/assets/images/posts/demystifying-internet-routing/BGP_Routing.drawio.svg)

---

## Part 3: The Privacy Illusion (DNS and SNI)

Because your phone is trapped inside your ISP's Autonomous System, you are subject to their rules. 

### Can I change my BGP provider like I change my DNS?
**No.** You can change your DNS in your phone settings because DNS is just a software query—you can ask any public phonebook for an address. But BGP is the *physical routing infrastructure*. You cannot force your phone to use a different BGP path without physically disconnecting and joining a new network (like switching SIM cards or connecting to Wi-Fi).

### If I change my DNS to 8.8.8.8, does my ISP still know where I am going?
**Yes.** Changing your DNS does not hide your traffic from your ISP for three reasons:
1. **Plaintext Queries:** If you don't use encrypted DNS, your ISP can read the request as it passes through their routers.
2. **The Destination IP:** Even with encrypted DNS, your ISP still sees the physical IP address you are asking them to route data to (e.g., Netflix's server IP).
3. **The SNI (Server Name Indication):** When your phone makes a secure HTTPS connection to the server, it has to perform a "TLS Handshake." During this handshake, your phone sends a "Client Hello" message directly to the target server, announcing which website it wants (since one IP can host thousands of websites). This SNI is sent in **plaintext**, and your ISP reads it as it passes by.

---

## Part 4: Enter the VPN (Virtual Private Network)

If standard web browsing is like driving in a glass car, a VPN is like pulling that car into a windowless, armored truck. 

### How a VPN Blindfolds the ISP
A VPN intercepts your internet traffic *before* it leaves your phone and encrypts everything—the DNS query, the SNI, and the target IP. Your ISP only sees an encrypted stream of data going to one single destination: the VPN server's IP address. 

### How does BGP work with a VPN? Is the VPN an AS?
Once your encrypted traffic reaches the VPN server, your home ISP's job is done. From there, the routing is handled by the VPN's network. 
* **Most common scenario:** The VPN rents servers in a massive data center. The **Data Center** is the AS and handles the BGP routing to your final destination.
* **Top-tier scenario:** The VPN company owns its hardware and registers as its own official AS, handling its own BGP routing directly for maximum privacy.

![VPN Connection](/assets/images/posts/demystifying-internet-routing/VPN_Connection.drawio.svg)

### Can the Datacenter monitor my traffic?
This is a massive privacy concern. The Datacenter AS sees your real IP address coming in, and the decrypted request to the website going out. To prevent the datacenter from linking the two (a correlation attack), VPNs use **Multiplexing** (mixing hundreds of users' traffic on one shared IP) and **RAM-Only servers** (wiping all data the second the server loses power).

### Does the ISP know I am using a VPN?
Yes. Your ISP's Deep Packet Inspection (DPI) tools can easily spot a VPN. Why? Because VPN protocols (like WireGuard or OpenVPN) don't use the standard web-browsing "Client Hello." Their handshake packets look fundamentally different. Furthermore, your ISP can simply look up the destination IP and see it belongs to a VPN datacenter. (The only exception is using "Stealth/Obfuscated" VPN settings, which disguise VPN traffic as regular HTTPS traffic).

---

## Part 5: Proxies and Chaining

### What is a Proxy Server?
If a VPN is an armored truck, a proxy is like hiring an assistant. You send an unencrypted request to the proxy server, and the proxy server fetches the website for you. The website only sees the proxy's IP. 

**Differences from a VPN:**
* Proxies are usually app-specific (e.g., just your browser), whereas VPNs encrypt system-wide network traffic.
* Proxies usually lack encryption, meaning your home ISP can still see exactly what you are asking the proxy to do. 

![Proxy Connection](/assets/images/posts/demystifying-internet-routing/Proxy_Connection.drawio.svg)

### Does a Proxy skip your ISP's BGP?
Yes, just like a VPN. Your home ISP uses its BGP to get your data to the Proxy server. Then, the Datacenter where the Proxy lives uses *its* BGP to reach the final website. 

### Can I chain a Proxy and a VPN?
Yes. You can configure your browser to use a Proxy server, and have that Proxy server run a VPN client. 
* **The Route:** Your Phone -> (Unencrypted) -> Proxy Server -> (Encrypted VPN Tunnel) -> Website.
* **The Catch:** Your home ISP still sees the unencrypted traffic going to the proxy. Plus, double-routing causes severe speed and latency penalties. For maximum privacy, it is much better to reverse the order: connect your phone to a VPN first, then use a proxy inside the secure tunnel.

![HLD](/assets/images/posts/demystifying-internet-routing/HighLevel_Architecture.drawio.png)
---
*Disclaimer: This post is for educational purposes to help users understand network infrastructure and privacy mechanisms.*
