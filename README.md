# Advent of Code 2022

Starting from day 7, I switched to Typescript.

    cd day07
    npx ts-node index.ts

# Notes

## Day 11

Part 2 was tricky with the worry levels becoming very large numbers. For example, we need to check if a number is divisible by 11. After the addition or the multiplication, it's the same if we store the result or the result modulo 11. Because all the monkey divisors are primes, we can do the operations modulo N where N is the product of all divisors. 

## Day 12

Part 1 is a shortest pathfinding problem. [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) is pretty well-known. The original code I created for Part 2 simply considered each cell with an elevation of 'a' and calculated the shortest path to the destination. A better solution is to start from the original destination and go backwards. This was also implemented after I submitted the results. I also found [Amit Patel's pages](https://theory.stanford.edu/~amitp/GameProgramming/) interesting.