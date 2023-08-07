# Thread
> java.lang.Thread
## Thread API
```java
//有参构造器，给线程命名
Thread(String name);

//获取、设置线程名称
public final String getName()
public final void setName(String)

//获取当前线程对象
public static Thread currentThread()

//线程休眠
public static native void sleep(long millis) throw InterruptedException

//线程加入
//相当于线程插队
public final void join() throw InterruptedException

//线程礼让
//暂停当前执行的线程，进入下一轮CPU执行权抢占
public static native void yield()

//线程守护
//当一个java进程中的所有工作线程都结束后，守护进程才会结束
public final void setDaemon(boolean on)

//线程中断
//直接强制中断线程会导致程序员无法预知该线程的执行状态
public final void stop()
```

## 线程优先级
Java采用固定数值的静态优先级，数值范围是1-10（10表示最高）

|常量名/方法名|解释|
| -- | -- |
|MAX_PRIORITY| 最高优先级10|
|MIN_PRIORITY|最低优先级1|
|getPriority()|获取优先级|
|setPriority(int n)|设置优先级|

## 创建线程的三种方式
### 1. 创建Thread类的子类对象

### 2. 基于Runnable接口创建Thread对象
使用Thread类的构造器Thread(Runnable target)创建线程。
有两种方式：
(1) 创建一个实现Runnable接口的类，创建子类对象，然后传递给Thread构造器，创建一个Thread对象。
(2) 匿名内部类和lambda表达式

### 3. 基于Callable接口创建Thread对象
(1) 实现Callable接口
(2) 创建一个FutrueTask对象，以Callable实现类的对象作为参数传递给构造器。
(3) 将FutrueTask对象作为参数传递给Thread构造器，创建一个Thread对象。

使用以Runnable作为形参的构造器创建Thread对象

方式一和方式二的比较
(1) 方式一必须直接继承Thread类，而java是单继承的，方式二没有这种限制。
(2) 方式二把线程对象和任务分开定义，实现了解耦，多个线程可以做同一个任务，更有利于线程间的数据共享。

## run() 和 start() 方法有什么区别
1. run()方法
   run()方法中定义了线程要执行的任务，直接调用run方法并不会启动一个新的线程，而只是普通的方法调用，在当前的线程中执行run()方法中的代码。
2. start()方法
   start()方法用于启动一个新的线程。当一个线程调用start()方法后，该线程会执行run()方法中的代码。



## 线程池
线程容器：负责存储维护一组线程的容器，其中的线程可以被反复使用。
任务队列：是一个阻塞队列，用于存储线程池当前等待执行的任务。
任务队列就像一个流水线，线程容器中的线程就像工人。如果线程容器中还有空闲的线程，就从任务队列队首获取任务并执行，如果没有空闲的线程，任务队列就排队等待。任务比较多时，还可以创建更多的线程来执行任务。

流程：
(1) 创建线程池（对象）
java.util.concurrent.Executors：工具类，用于生成线程池对象。
java.util.ocncurrent.ExecutorService：一个接口，全体线程池类型的父类，用于指代线程池对象。
```java
//可自动扩容的线程容器
ExecutorService pool = Executors.newCachedThreadPool();

//创建一个固定线程数量的线程池
ExecutorService pool = Executors.newFixedThreadPool(3);

//线程数量固定为1
ExecutorService pool = Executors.newSingleThreadExecutor();

```
(2) 向线程池提交任务，先来先执行。
依赖于接口java.util.concurrent.ExecutorService当中的两个submit方法：
```java
Future<?> submit(Runnable task)
Future<?> submit(Callable<?> task)
```
提交Runnable任务
```java
class demo {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newCachedThreadPool();
        pool.submit(new MyRunnableTask());
    }
}

class MyRunnableTask implements Runnable {
    @Override
    public void run() {
        System.out.println("hello world!");
    }
}

```

提交Callable任务
```java
class demo {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newCachedThreadPool();
        //submit方法的返回值类型是Future
        Future<?> callResult = pool.submit(new MyCallableTask());
        //通过Future接口的get()方法获取call方法返回值
        String s = callResult.get();
        Sytem.out.println(s);
    }
}

class MyCallableTask implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("hello world!");
        return "你好！";
    }
}
```

(3) 任务调度执行。
(4) 线程池关闭。
```java
//执行完任务列表中所有已提交的任务，关闭线程池，不在接收新的任务
void shutdown()

//立刻停止所有正在执行的任务，也不再处理任务列表中等待的任务，并返回正在等待执行的任务列表
List<Runnable> shutdownNow()
```
