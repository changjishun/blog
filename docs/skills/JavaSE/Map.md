# Map

|               | 父类接口 |                           底层结构                           |               扩容机制                |     存储是否有序     |    存储是否允许重复     |       是否允许存储null       |
| :-----------: | :------: | :----------------------------------------------------------: | :-----------------------------------: | :------------------: | :---------------------: | :--------------------------: |
|      Map      |    -     |                              -                               |                   -                   |       部分有序       | 不能(指的是key不能重复) |           部分允许           |
|    HashMap    |   Map    |                       数组+链表+红黑树                       |       默认长度是16，扩容机制2倍       |         无序         |         不允许          |           **允许**           |
| LinkedHashMap | HashMap  | 完全复用了父类的结构、方法， 在父类的基础上维护了一个双向链表 |                   -                   |       **有序**       |         不允许          |           **允许**           |
|   HashTable   |   Map    |                          数组+链表                           | 数组长度默认是11，默认扩容机制是2倍+1 |         无序         |         不允许          | 不允许存储null作为Key和value |
|    TreeMap    |   Map    |                            红黑树                            |                   -                   | **存储数据大小有序** |         不允许          |            不允许            |

## 什么是Map

Map就是用来存储键值对的接口，Collection存储的是单列的数据，Map存储的是键值对(key-value)，key和value成对存储，可以通过key值查找对应的value。在Map中，key不允许重复。

## API

```java
//新增、删除、查找
V put(K key, V value):添加键值对，如果键值对存在，就是更新键值对
void putAll(Map<? extends K, ? extends V> m)：将一个map的所有键值对都放入这个map

V get(Object key)：根据一个key获取value，如果key不存在就返回null

V remove(Object key)：删除map中key对应的键值对

boolean containsKey(Object key)：判断map中是否包含这个key

boolean containsValue(Object value)：判断map中是否包含这个value

void clear()：清空map

boolean equals(Object o)：判断两个map是否相等

int hashCode：返回此映射的哈希码值

boolean isEmpty()：判断map中是否为空

int size()：返回map的大小，键值对个数

Set<Map.Entry<K, V>> entrySet()：返回此映射中包含映射关系的Set视图

Set<K> keySet()：返回此映射中包含的键的Set

Collection<V> values()：返回此映射中值的Collection
```

|      |                     Map                      | HashMap | LinkedHashMap | HashTable | TreeMap                             |                             |
| :--: | :------------------------------------------: | :-----: | ------------- | --------- | ----------------------------------- | :-------------------------: |
| 新增 |            V put(K key, V value)             |         |               |           | Map.Entry<K, V> ceilingEntry(K key) | 大于等于给定key的最小键值对 |
|      | void putAll(Map<? extends K, ? extends V> m) |         |               |           | K ceilingKey(K key)                 |  大于等于给定key的最小key   |
| 删除 |                V remove(key)                 |         |               |           | Map.Entry<K, V> floorEntry(K key)   |   小于等于key的最大键值对   |
| 查找 |                  V get(key)                  |         |               |           | Map.Entry(K, V> higherEntry(K key)  |   大于给定key的最小键值对   |
|      |               containsKey(key)               |         |               |           | Map.Entry<K, V> lowerEntry<K key    |     小于key的最大键值对     |
|      |             containsValue(value)             |         |               |           | K lowerKey(K key)                   |                             |
|      |                 void clear()                 |         |               |           | Map.Entry<K, V> firstEntry()        |                             |
|      |              boolean isEmpty()               |         |               |           | Map.Entry<K, V> lastEntry()         |                             |
|      |                  int size()                  |         |               |           | Map.Entry<K, V> poolFirstEntry()    |      删除最小的键值对       |
|      |       Set<Map, Entry<K, V>> entrySet()       |         |               |           | Map.Entry<K, V> pollLastEntry()     |      删除最大的键值对       |
|      |               Set<K> keySet()                |         |               |           |                                     |                             |
|      |             Collection<V> values             |         |               |           |                                     |                             |



## HashMap

### 什么是hash

就是把固定或**任意长度**的输入（hashCode，hash），通过散列算法变换成**固定长度的输出**（数组下标），该输出就是散列值。一个输入对应一个输出，多个输入可能对应一个输出（hash冲突）。



### 初始化容量及扩容

HashMap的底层数组的初始容量是16，扩容机制是2倍。



### 加载因子

在HashMap底层维护了一个加载因子，用来表示存储到多少就扩容。

默认数组长度16，默认加载因子是0.75f，阈值 = 16 * 0.75 = 12。当HashMap存储的键值对数量超过阈值，就会触发数组扩容。



### HashMap底层数组结构

HashMap的底层结构是数组+链表+红黑树

HashMap数组底层存储的key-value是以Node结点存储的。

```java
class Node {
    K key;
    V value;
    int hash;
    Node next;
}

transient Node<K, V>[] table;
```



### hash的计算

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

为什么

hashCode ^ (hashCode右移16位)

**因为计算键值对在数组中存储地址（索引）的方式是hashcode & (length - 1)**

**其中length为底层数组长度，上述操作相当于hashCode % length, （因为length都是2的倍数)**
$$
length = 2^n - 1
$$
那么上述操作就相当于保留hashCode的低n位，如果直接用hashCode计算索引的位置的话，hashCode的高位数据就会丢失，就会导致很多hash值不同，而低位没有区别的数计算出来的数组索引是一样的，从而导致很多数据发生冲突。为了避免这种情况，hashMap将高16位与低16位进行异或操作，再用计算出的结果对数组长度取余（和数组长度 - 1 &操作）得到索引，这样就可以保证高位的数据也可以参与到&运算中来，以增加索引的散列程度让数据分布的更加均匀。



### hashCode

是根据对象的某些信息推导出来的int类型的值，默认情况下是对象的存储地址，主要用于在散列存储结构中确定元素的存储地址，例如HashMap、HashTable。



### a % b = a & (b - 1)在什么情况下会成立

只有在b 等于2的幂时才会成立
$$
b = 2 ^ n
$$
也就是说，b的第n + 1位为1，低n位都为0。将a拆成两部分的和，一部分是低n位，另一部分是剩下的高位部分，高位的部分一定会被b整除，所以取余剩下来的就是低n位，a低n位就是取余后的结果，既然如此，保留b的低n位就是取余后的结果，而a和n个1相&就可以保留低n位。



### HashMap对key重复的定义

```java
(p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
```

hashmap中对重复的定义`(p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))`为什么要求hash相同？

1. 元素相同，hash一定相同。（同一元素的hashCode一定相同，hash也必然相同）
2. hash相同，元素不一定相同。（不同的元素可能会发生hash冲突，hash相同）

综上所述，hash相同是元素相同的前提，必要条件，只有hash相同才会有可能元素相同。

`k = p.key) == key` 是引用相同，也就是同一个对象。

`key != null && key.equals(k)` 是，基于该对象的equals比较方法判断，这两个元素相同。

我们在使用自定义的类作为Key时，需要重写equals()方法和hashCode()方法。



### HashMap的添加流程

1. 计算key的hash

   `(key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)`

2. 使用计算得到的hash与底层数组长度n取余，得到这个键值对在数组上的位置。

   `hash % n = hash & (n - 1)`

3. 检查计算得到的数组位置上是否有键值对

   (1) 如果没有元素，就直接新建结点，然后插入到数组。

   (2) 如果数组位置有元素，就比较是否相等。

   判断标准：

   `p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k)))`

   ​	如果相等，就直接用新的value替代旧的value，添加结束。

   ​	如果不相等，则继续往下比较（链表、红黑树），直到最后一个也不相等，就把他插入到末尾。

4. 如果是链表，插入后长度超过阈值（8），则可能会转化为红黑树。

   **如果数组长度小于64，不会转化为红黑树，会直接扩容。**

5. 如果插入后Map中结点数超过阈值（加载因子 * 数组长度），则会进行扩容，



### HashMap的构造方法

```java
//无参构造
HashMap()

//指定初始容量、默认加载因子
HashMap(int initialCapacity)

//指定初始容量、加载因子
HashMap(int initialCapacity, float loadFactor)

//
HashMap(Map<? extends K, ? extends V> m)   
```



### 扩容后位置的问题

原位置：hash % 16 = x

新位置：hash % 32 = (x + 16 * n) 等于x或x + 16

元素在新数组的位置，等于原位置或原位置 + 旧数组长度



### 链表转化为红黑树

当某个数组位置链表长度超过8的时候，就要由链表转换成红黑树。

当链表长度超过8时一定会转化成红黑树吗？为什么？



### 红黑树转化为链表

有两种情况：

1. 删除数据的时候，要删除的数据在红黑树上，删除数据导致红黑树上的数据减少，由红黑树转化成链表。

2. 扩容的时候，一个红黑树再扩容后，会被拆成两部分，任意部分数据过少，都会由红黑树转化成链表。

   红黑树拆成低位（旧位置）和高位（旧位置 + 旧数组长度）两部分，任意部分分配的数据**小于等于6**，就要由红黑树转化成链表。

   为什么会被拆成这两部分？参考**扩容后位置的问题**



## HashTable

线程安全，jdk1.0的时候出现，HashMap是jdk1.2的时候出现。HashMap的出现就是为了取代HashTable。HashMap的红黑树是在1.8才加上去的，所以在此之前两个的结构是一样的。

### HashMap和HashTable的相同点和不同点

|           | 父类接口 |                 底层结构                  | 存储是否有序 | 是否允许存储重复元素 | 是否允许存储null | 线程安全 |
| :-------: | :------: | :---------------------------------------: | :----------: | :------------------: | :--------------: | :------: |
|  HashMap  |   Map    | 1.8之前 数组+链表 1.8之后数组+链表+红黑树 |     无序     |        不允许        |       允许       |  不安全  |
| HashTable |   Map    |                 数组+链表                 |     无序     |        不允许        |      不允许      |   安全   |

为什么不使用线程安全的类？



## TreeMap

### 构造方法

```java
//无参构造
TreeMap()

//给定比较器
TreeMap(Comparator<? super K> comparator)
    
//构造一个与给定映射具有相同映射关系的新的树映射，该映射根据其键的自然排序进行排序
Treemap(Map<? extends K, ? extends V> m)
    
//构造一个与指定有序映射，具有相同映射关系和相同排序规则的新的树映射
TreeMap(SortedMap<K, ? extends V> m)  
  
```



### TreeMap的API

```java
Map.Entry<K, V> ceilingEntry(K key):大于等于key的最小键值对

```

K ceilingKey(K key): 大于等于key的最小key

Map.Entry<K, V> floorEntry(K key): 小于等于key的最大键值对

K floorKey(K key): 小于等于key的最大key



## LinkedHashMap

1. LinkedHashMap是HashMap的一个子类
2. 底层完全复用了父类HashMap的结构、参数、方法
3. 在HashMap的基础上，额外的维护了一个双向链表，以保证迭代顺序
4. 存储元素有序
5. 不允许存储重复的元素
6. 允许存储null

### LinkedHashMap的构造方法

```java
LinkedHashMap()

LinkedHashMap(int initialCaapacity)

LInkedHashMap(int initialCapacity, float loadFactor)

LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)

LinkedHashMap(Map<? extends K, ? extends V> m)
```



## Properties

HashTable的子类，用于处理配置文件。

配置文件1.properties

```properties
username=root
pwd=12345
```



```java
Properties properties = new Properties();
properties.load(new FileInputStream("1.properties"));

//获取配置文件中的value
String username = properties.getProperty("username");
String pwd = properties.getProperty("pwd");
System.out.println(username + ": " + pwd);

//修改配置文件
properties.setProperty("pwd", "666666");
System.out.println("----修改后的----");
System.out.println(username + ": " + pwd);
System.out.println(ClassLoader.getSystemResource("").getPath());
```









































