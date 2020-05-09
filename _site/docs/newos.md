# 一个智能化的os kernel 

>  IOT 时代下的智能化内核

这个的 os 的理念应用于「IOT」，也是为 IOT 中的「智能家居」所服务的。所以，一切的设想和思路，都是为了提升智能家居 os 的体验所设计。

目前，智能家居还不够成熟，内部存在诸多问题，比如架构松散，指令效率不高，配置复杂，智能存在局限性等问题。为了解决这些问题，我设计出了一个智能家居的理念，用于统一整个智能家居系统。

![Untitled Diagram](https://h00001.github.io/data/u.svg)


|node type|node job|
|-|:--|
|Data node|It can calculate at itself.Data nodes can backup each other and communicate with each other for distributed computing.|
|calculator node|Assign the calculation task to the data node, summarize the calculation result of the data node, and pass it to the control node|
|Control node|The control node can communicate with other control nodes and vote on some events.|
|config center|config parameters|

soft bus:用来传递数据和事件[event]

注释：投票包括一些智能化的部署，例如 camera 自动化探测选择范围。

根据这个设计理念，设计出的操作系统内核

## kernel

> 我们做的是一个智能化的，分布式的内核，使用者不知道他是一个系统，还是多个系统，但是操作他们和操作一个系统是一样的。

所有的事情，用户只需要调用就好，不需要知道他来自哪里，也不需要知道如何执行

![main](https://h00001.github.io/data/main.svg)

解释：

1. 内核包括 RPC 系统，内存管理，进程管理。一切远程调用都是用 RPC 模块进行底层执行。
2. 中间层主要用于分布式联动，包括分配分布式任务，整个体系的资源管理，整个体系的借口汇总，软总线管理，事件管理。
3. 用户可以进行接口 export，这种接口导出可以传播到整个系统，分布式系统的其他节点可以进行调用。
4. 事件[event]: 可以是系统事件，也可以是用户事件。事件会随总线进行传播，传递给其他节点进行响应。其他节点如同响应本地事件一样。
5. 协调服务，包括所需要的分布式锁，分布式队列相关基础服务

## 优势

### 远程调用

远程调用如同本地调用一样

例如用户可以对 camera 进行编程，导出 `screemshort()->picture`·接口，在分布式系统中进行传递

那么对于控制中心进行编程，完全可以直接调用函数

```
camera[camera_id].screemshort()
```

这样调用如同调用本地资源一样。

### 远程进程间通信

远程进程间痛惜和本地进程间通信一样，内核会选择一条最合理的通道，速度和方式进行远程通信。当然，分布式锁也属于远程进程通信的一种。

### 分布式事件

事件由一个事件源发出，传播到整个系统，编程者可以对事件进行响应。例如

发送者：

```c
event_manage->send(URGENCY,1,"The door was damaged")
```

响应者：

```scala
event_manage->register_user(1,fn_door_open)
def fn_door_open(message *msg){
  // 门被破坏，响铃
  ring.parallels.stream(_.doRing)
  //当然，铃也在远程，导出<function> doRing()
}
```
#### 软总线中断

优先级很高的事件，可以打断其他任务

### 动态注册

新的节点接口可以动态注册到系统中，也可以离开或转移。

### 进程迁移

1. 分布式系统会定期扫描系统节点压力情况，针对有压力过大的节点，对内部执行的进程进行迁移，迁移到压力小的节点。
2. 如果该节点有更加紧急的任务。

### 任务迁移

分配者肯定会将任务分配到离该任务数据最近的数据节点进行机选，但是，当系统发生变化时，任务会进行迁移到其他节点。

### 任务拆分

task manager会合理拆分任务，分配到其他节点。当然也会根据系统当前运行状态，选择不同的拆分方案。

### 点对点通信

遇到需要高速，紧急地数据，task manager会和通信节点之间建立临时紧急通道，用来快速传输数据。方式的不同导致通道的性能影响会进行记录和分析，下次使用，会建立最优的方式。这个操作对用户没有感知。例如：使用者观看高清摄像头数据，高清视频数据会建立视频节点到控制节点，甚至智能˙终端节点的直接数据通道，这个通道在停止观看后被销毁。

## 举个🌰

某人回家，带智能手表，进入范围后，检测节点检测出手表（end node），向系统发送了一条事件，最近的数据节点收到事件后开始和表进行通信，获取的运动记录，同步到数据中心，进行今日运动的大数据计算。控制中心调用表的时间接口，发现时间是22:00，将所有灯亮起。

这个例子或许很简单，但是如果使用其他系统，就配置而言都是很复杂的。但是在这个 os 中，编程如同苏联生产导弹一样容易。







