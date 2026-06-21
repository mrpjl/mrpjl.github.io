---
layout: layouts/base.njk
title: Home
---

# Welcome

Hello and welcome.

I'm Prajwal, a Cloud Security Engineer with experience in cloud infrastructure, platform engineering, DevOps, and security automation. Over the years, I've worked with AWS, Terraform, Kubernetes, Python, CI/CD systems, and Cloud Security Posture Management (CSPM) platforms.

This blog is a place where I share technical notes, lessons learned, experiments, and practical solutions from projects, certifications, and day-to-day engineering work.

## Why This Blog Exists

Over the years, I've accumulated a large number of notes, troubleshooting guides, code snippets, architecture decisions, and lessons learned from projects, certifications, and day-to-day engineering work. Most of them are either half-written, scattered across different tools, or buried in documents that I rarely revisit.

This blog is an attempt to bring that knowledge into a single place.

My primary goal is to create a personal knowledge base that I can easily refer back to in the future. At the same time, if these notes, tutorials, and lessons learned help someone else solve a problem or learn something new, that's a welcome bonus.

The content here will range from detailed technical articles to shorter notes, experiments, troubleshooting guides, and observations from real-world engineering work. Rather than aiming for perfect documentation, I aim to document things as I learn, build, and explore them.

Where possible, I will focus on reproducible examples, automation, and real-world use cases rather than purely theoretical discussions.

## What to Expect

Topics on this blog will primarily include:

- AWS, GCP and cloud architecture
- Terraform and Infrastructure as Code
- Kubernetes and container platforms
- Cloud security and CSPM
- Python and automation
- Platform engineering
- CI/CD and developer tooling
- Technical design and architecture decisions
- Certification preparation and learning notes
- Engineering career reflections
- Privacy topics

Some articles will be deep technical tutorials, while others may be shorter notes, troubleshooting guides, or summaries of lessons learned from projects and experiments.

## Latest Posts
{% for post in collections.posts.slice(0, 5) %}
- [{{ post.data.title }}]({{ post.url }})

{% endfor %}

Browse the full collection of posts in the Blog section.

## Analytics and Privacy

This blog uses Google Analytics to help me understand how readers use the site. I look at aggregate metrics such as page views, popular articles, and approximate time spent on posts so I can improve the content and focus on topics that readers find useful.

I am not interested in identifying individual visitors. IP anonymization is enabled, and I primarily review overall trends and engagement rather than information about specific users.

The purpose of collecting this data is simply to make the blog more useful and to understand which topics are most valuable to readers.

## Thanks for Visiting

If you've found your way here, thank you for reading.

I hope you find something useful, and I hope this collection of notes grows into a valuable resource for both myself and others over time.

#### The experiences shared here are my own and do not represent the views of any current or former employer.

