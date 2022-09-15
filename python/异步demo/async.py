import asyncio
import time
from tracemalloc import start
def count_down_sync(name,delay):
  indents =(ord(name)-ord('A'))*'\t'
  n=3
  while n:
    time.sleep(delay)
    global start
    duation=time.perf_counter()-start
    print('-'*40)
    print(f'{duation:.4f}\t{indents}{name}={n}')
    n-=1
def sync_call():
  global start
  start=time.perf_counter()
  count_down_sync('A',1)
  count_down_sync('B',0.8)
  count_down_sync('C',0.5)
  print('-'*40)
  print('Done')
async def count_down_async(name,delay,start):
  indents=(ord(name)-ord('A'))*'\t'
  n=3
  while n:
    await asyncio.sleep(delay)
    duration=time.perf_counter()-start
    print('-'*40)
    print(f'{duration:.4f}\t{indents}{name}={n}')
    n-=1
async def async_call():
  start=time.perf_counter()
  tasks=[asyncio.create_task(count_down_async(name,delay,start)) for name,delay in [('A',1),('B',0.8),('C',0.5)]]
  await asyncio.wait(tasks)
  print('-'*40)
  print('Done')
def main():
  sync_call()
  #  async_call()
# main()
asyncio.run(async_call())
# async_call()