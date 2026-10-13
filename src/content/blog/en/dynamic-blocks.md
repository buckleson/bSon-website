---
title: 'Dynamic Blocks: Fast When Quiet, No Backlog at Peaks'
description: 'Why fixed-size blocks build backlogs on busy days, and how Hyper 0X lets each L2 grow and shrink its blocks with demand so payments never queue.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-13
readTime: 4
tags: ['Scaling', 'Enterprise blockchain']
faqs:
  - question: 'What are dynamic blocks?'
    answer: 'Blocks whose size follows demand. A block seals when it reaches its size target or when a time limit runs out, whichever comes first, so quiet periods get small, quick blocks and busy periods get larger ones.'
  - question: 'Do dynamic blocks add capacity?'
    answer: 'No. They remove the artificial bottleneck of a fixed block size, so the compute you already have is used when you need it.'
---

Dynamic blocks change size with demand. On Hyper 0X a block seals when it reaches its size target or when a time limit runs out, whichever comes first. Quiet periods get small blocks that seal quickly; busy periods get larger blocks, so a sudden spike does not turn into a queue.

## What goes wrong with fixed-size blocks?

Most blockchains use fixed-size blocks. That works on an average day, but traffic is rarely average. Picture a bank's payroll L2 on salary day: thousands of payments arrive in a few minutes. With a fixed cap, a backlog forms at once and some salaries arrive late, even though the network had spare compute a moment earlier.

## How do dynamic blocks work?

Each L2 on [Hyper 0X](../../products/hyper-0x/) sets three values: a minimum block size, a maximum block size and a time limit. When the network is quiet, small blocks seal on the time limit, so waits stay short. When load spikes, blocks grow toward the maximum and the backlog never builds.

## What is the honest limit?

Dynamic blocks do not add compute. They remove the artificial bottleneck of a fixed block size, so the capacity you have is used when you need it.

## Why one L2 per workload helps

Because every customer runs their own L2, a payroll spike at one bank never slows down another institution's workload. Each L2 tunes its own block settings, policies and bridges, and all of them settle to one shared record on Hyper 0X. Read more in [private L2 vs public blockchain](../private-l2-vs-public-blockchain/).
