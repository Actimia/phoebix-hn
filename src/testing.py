import random
import math
tree = [
    [
        [],
        [
            [
                [[[[], [], []]]]
            ],
            []
        ],
        []
    ],
    [
        [],
        []
    ],
    [],
    [],
    []
]

def randomTree(level=0):
    maximum = 8 - (2 * level)
    if maximum == 0:
        return []
    return [randomTree(level=level + 1) for x in range(poisson(maximum))]


def score(level, offset):
    return (level * 3 + 2) * (offset + 2)

threshold = 50

def printTree(tree, level=1):
    offset = 0
    numprinted = 0
    for subtree in tree:
        if score(level, offset + 1) > threshold:
            break
        print(' ' * level + 'c')
        numprinted += printTree(subtree, level=level + 1)
        offset += 1
    if offset < len(tree):
        print(' ' * level + '+' + str(len(tree) - offset))
    return numprinted + offset

def printGraph():
    output = '\n'.join(
        ''.join('o' if score(level, offset) < threshold else ' ' for level in range(25)) 
        for offset in range(44))
    
    print(output)
    return output.count('o')

def poisson(L):
    limit = random.random() / math.exp(-L)
    value = 0
    i = 0
    while value < limit:
        value += L ** i / math.factorial(i)
        i += 1
    
    return i - 1


if __name__ == "__main__":
    #print(printGraph())
    print(printTree(randomTree()))


