# Advent of Code 2022

Starting from day 7, I switched to Typescript.

    cd day07
    npx ts-node index.ts

Day 11 part 2 was tricky with the worry levels becoming very large numbers. For example, we need to check if a number is divisible by 11. After the addition or the multiplication, it's the same if we store the result or the result modulo 11. Because all the monkey divisors are primes, we can do the operations modulo N where N is the product of all divisors. 