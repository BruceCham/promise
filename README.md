# 验证队列执行顺序

```txt
promise async/await setTimeout setImmediate
```

</br>

## 队列循环分解

原生 `node` 事件模型中，队列循环可以细分为四个级别： 

1. 当前 `tick`(当前执行中的队列，我们正常理解的同步代码) 
2. 第二队列 `nextTick`(`idle` 观察者，`process.nextTick`)，多个 `idle` 观察者在一个循环体中
3. 正常队列 `Tick` (`I/O` 观察者，`Promise`)，多个 `I/O` 观察者在一个循环体中
4. 正常队列 `Tick` (`I/O` 观察者，`setTimeout`)，多个 `I/O` 观察者在一个循环体中
5. 最后队列 `lastTick` (`check` 观察者， setImmediate)，单个 `check` 观察者独占一个循环体

</br>

**`async` 内部实现为 `Promise`**

</br>

## 执行顺序

```js
当前队列 > 第二队列 nextTick > 正常队列 promise > 正常队列 setTimeout > 正常队列... > 最后队列 setImmediate
```
