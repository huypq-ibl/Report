import time
import sys

# argv[1] : miliseconds
# argv[2] : string datetime format year-month-day hour-minute-second
# argv[3] : milisecond in second (0.xxx)

start = float(sys.argv[1])
end = float(sý.argv[3]) + time.mktime(time.strptime(sys.argv[2], "%Y-%m-%d %H:%M:%S"))

print(end - start)
