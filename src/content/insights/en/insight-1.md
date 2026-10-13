---
title: 'Dynamic Blocks: Fast When Quiet, No Backlog at Peaks'
description: 'Why Hyper 0X lets block size follow demand, and what that means on salary day.'
cardImage: '@/images/insights/insight-1.avif'
cardImageAlt: 'Abstract illustration of blocks growing with load'
---

Most blockchains use fixed-size blocks. That works on an average day, but traffic is rarely average.

## The salary-day problem

Picture a bank's payroll L2 receiving 6,000 payments per second for ten minutes on salary day. With fixed blocks capped at 2,000 transactions per second, a backlog builds up immediately. In our illustrative model it takes around 23 minutes to clear, and some salaries arrive 20 minutes late.

## How dynamic blocks work

On Hyper 0X, a block seals when it reaches its size target or when a time limit runs out, whichever comes first. Each L2 sets its own minimum size, maximum size and time limit. When the network is quiet, small blocks seal quickly. When load spikes, blocks grow, in the salary-day model from about 150 to 3,000 payments, and waits stay under one second.

## The honest limit

Dynamic blocks do not add compute. They remove the artificial bottleneck of a fixed block size, so the capacity you have is used when you need it.

## One L2 per workload

Because every customer runs their own L2, a payroll spike at one bank never slows down another institution's workload. Each L2 tunes its own block parameters, policies and bridges, and all of them settle to one shared record on Hyper 0X.
