import os
import sys
# argv[1] : block number start
# argv[2] : block number end
# use on server

os.system('sawtooth block list > logBlock')

count = 0
with open('logBlock', 'r') as f:
    lines = f.readlines()
    n = len(lines)
    startPoint = n - int(sys.argv[2]) - 1
    endPoint = n - int(sys.argv[1])
    for line in lines[startPoint:endPoint]:
        x = line.split(' ')
        while '' in x:
            x.remove('')
        count += int(x[3])

print(count)