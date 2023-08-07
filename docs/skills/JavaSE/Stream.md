# Stream

| 创建流         | 中间操作        | 终止操作                    |
| :------------- | :-------------- | :-------------------------- |
| 集合类的Stream | filter (过滤)   | count() (计数)              |
| 由值创建       | distinct (去重) | collect (存储为List)        |
| 由数组创建     | limit (截取)    | anyMatch (是否有匹配的)     |
|                | skip (跳过)     | allMatch (是否都匹配)       |
|                | map (转换)      | noneMatch (是否没有匹配的)  |
|                | sorted (排序)   | findAny (找到任意一个元素)  |
|                |                 | findFirst (找到第一个元素)  |
|                |                 | forEach (遍历流中的元素)    |
|                |                 | reduce (按指定方式减少元素) |

以下示例都是基于Student类和List<Student> list

```java
class Student{
    private int id;
    private String name;
    private int age;
    private String city;
    
    //构造方法、get、set、toString方法省略
}
```



```java
List<Student> list = new ArrayList<Student>();
```



## 创建流

创建流的方式有三种

### 集合类的stream

```java
Stream<Student> stream1 = list.stream();
```



### 由值创建

```java
Stream<String> stream2 = Stream.of("张三", "李四", "王五", "马六");
```



### 由数组创建

```java
String[] strArr = {"张三", "李四", "王五", "马六"};
Stream<String> stream3 = Arrays.stream(strArr);
```



## 中间操作

### filter

示例：返回城市为北京的学生对象。

匿名内部类方式：

```java
List<Student> collect = list.stream()
        .filter(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return "北京".equals(student.getCity());
            }
        })
        .collect(Collectors.toList());
System.out.println(collect);
```

lambda表达式方式：

```java
List<Student> collect = list.stream()
    	//
        .filter(student -> "北京".equals(student.getCity()))
        .collect(Collectors.toList());
System.out.println(collect);
```



### map

map()中的参数是Function接口的匿名内部类对象

Function<Student, Integer>

Student是流中元素的类型，Integer是转换后的类型。

该类中重写的apply方法返回的就是流转换后的元素。

示例：将流中的对象由学生转换成学生所在的城市。

```java
List<String> collect = list.stream()
        .map(new Function<Student, String>() {
            @Override
            public String apply(Student student) {
                return student.getCity();
            }
        })
        .distinct()
        .collect(Collectors.toList());
System.out.println(collect);
```

map:

> 将一种类型转换成另外一种类型，获得另一种类型

Function<Student, String>中

Student是原来的类型，String是转换后的类型，通过创建Function接口的匿名内部类对象作为参数传入map，重写它的apply方法，形参内容是流中原来的类型，return语句就是转换后的数据内容。在上述例子中，是将流中的内容由Student类型转换成String类型的student的城市信息city。流中的内容原先是Student类型，通过return返回student的city信息，将流中的内容转换。转换后的内容可以是原来类型的一些属性参数，也可以是对原来类型的加工处理后的内容。

**lambda表达式方式：**

原来的数据类型作为形参 -> 返回转换后的数据类型内容

```java
List<String> collect = list.stream()
        .map(student -> student.getCity())
        .distinct()
        .collect(Collectors.toList());
System.out.println(collect);
```



### distinct

对元素去重，底层是LinkedHashSet。

而去重最关键的是判断重复的标准是什么。

使用自定义的类调用distinct需要重写equals方法和hashCode方法，用于提供判断两个对象是否相同的标准。



### limit

limit方法用于返回前n个元素，如果流中的元素个数小于n，则有多少就返回多少。



### skip

skip(n)方法，跳过前n个元素。



### sorted

sorted排序需要传入一个比较器，提供一个比较规则。

示例：将流中的对象按学生年龄排序。

```java
List<Student> collect = list.stream()
        .sorted(new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o1.getAge() - o2.getAge();
            }
        })
        .collect(Collectors.toList());
System.out.println(collect);
```

lambda表达式方式：

```java
List<Student> collect = list.stream()
        .sorted((o1, o2) -> o1.getAge() - o2.getAge())
        .collect(Collectors.toList());
System.out.println(collect);
```



## 终止操作

### collect

可以将元素归纳进可变容器List、Map、Set、Collection、ConcurrentMap

- Collectors.toList()

- Collectors.toMap()

- Collectors.toSet()

- Collectors.toCollection()



#### Collectors.toList()

```java
List<Student> collect = list.stream()
        .sorted((o1, o2) -> o1.getId() - o2.getId())
        .collect(Collectors.toList());
System.out.println(collect);
```



#### Collectors.toMap()

`Collectors.toMap(参数1， 参数2)`

参数1和参数2都是Function接口的匿名内部类对象

Function<Student, Integer>

Student是流中元素的类型，Integer是转换后的类型。

参数1：决定map的key的内容，Function<Student, Integer>， 此处key的类型是Integer。

参数2：决定map的value的内容，Function<Student, Student>，此处value的类型是Student。

```java
Map<Integer, Student> collect = list.stream()
        .sorted((o1, o2) -> o1.getId() - o2.getId())
        .collect(Collectors.toMap(new Function<Student, Integer>() {
            @Override
            public Integer apply(Student student) {
                return student.getId();
            }
        }, new Function<Student, Student>() {
            @Override
            public Student apply(Student student) {
                return student;
            }
        }));
```

lambda表达式形式：

```java
Map<Integer, Student> collect = list.stream()
        .sorted((o1, o2) -> o1.getId() - o2.getId())
        .collect(Collectors.toMap(student -> student.getId(), student -> student));     
```



#### Collectors.toSet()

```java
Set<String> collect = list.stream()
        .map(student -> student.getCity())
        .collect(Collectors.toSet());
```



#### Collectors.toCollection()

toCollection()中的参数为

```java
new Supplier<Collection<? super String>>() {
            @Override
            public Collection<? super String> get() {
                return null;
            }
        })
```

示例：

```java
LinkedList<String> collect = list.stream()
        .map(student -> student.getCity())
        .collect(Collectors.toCollection(new Supplier<LinkedList<String>>() {
            @Override
            public LinkedList<String> get() {
                return new LinkedList<>();
            }
        }));
```



### anyMatch

是否存在匹配的

```java
boolean anyMatch = list.stream()
        .anyMatch(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return "北京".equals(student.getCity());
            }
        });
```



### allMatch

是否所有的都匹配

```java
boolean allMatch = list.stream()
        .allMatch(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return "成都".equals(student.getCity());
            }
        });
```



### noneMatch

是否没有匹配的

```java
boolean noneMatch = list.stream()
        .noneMatch(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return "成都".equals(student.getCity());
            }
        });
```



### findAny

返回流里面的任意一个元素（默认第一个），返回类型为Optional

`Optional<T> findAny()`

isPresent()

ifPresent()

orElse()

示例：返回流中城市为北京的任意一个学生（默认是第一个）。

```java
Optional<Student> any = list.stream()
        .filter(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return "北京".equals(student.getCity());
            }
        })
        .findAny();
if(any.isPresent()) {
    Student student = any.get();
    System.out.println(student);
}
any.ifPresent(new Consumer<Student>() {
    @Override
    public void accept(Student student) {
        System.out.println("存在 " + student);
    }
});
Student orElse = any.orElse(new Student(0, "默认值", 0, null));
System.out.println("orElse " + orElse);
```

lambda表达式形式：

```java
Optional<Student> any = list.stream()
        .filter(student -> "北京".equals(student.getCity()))
        .findAny();
if(any.isPresent()) {
    Student student = any.get();
    System.out.println(student);
}
any.ifPresent(student -> System.out.println("存在" + student));
Student orElse = any.orElse(new Student(0, "默认值", 0, null));
System.out.println("orElse " + orElse);
```



### findFirst

示例：返回流中年龄大于17的第一个学生。

```java
Optional<Student> first = list.stream()
        .filter(new Predicate<Student>() {
            @Override
            public boolean test(Student student) {
                return student.getAge() > 17;
            }
        })
        .findFirst();
if(first.isPresent()) {
    Student student = first.get();
    System.out.println(student);
}
```



### forEach

遍历流中的所有元素

示例：

```java
list.stream()
        .sorted((o1, o2) -> o1.getId() - o2.getId())
        .forEach(new Consumer<Student>() {
            @Override
            public void accept(Student student) {
                System.out.println(student);
            }
        });
```

lambda表达式形式：

```java
list.stream()
        .sorted((o1, o2) -> o1.getId() - o2.getId())
        .forEach(student -> System.out.println(student));
```



### count

返回流中元素的个数

```java
long count = list.stream()
        .count();
System.out.println(count);
```



### reduce

reduce:将参加计算的元素按照某种方式减少。

例如：

- 两个元素比较，返回大的。
- 两个元素，返回两个元素之和。

示例：返回最大的年龄

```java
Optional<Integer> reduce = list.stream()
        .map(student -> student.getAge())
        .reduce(new BinaryOperator<Integer>() {
            @Override
            public Integer apply(Integer integer, Integer integer2) {
                if(integer > integer2) {
                    return integer;
                }
                return integer2;
            }
        });
if(reduce.isPresent()) {
    Integer maxAge = reduce.get();
    System.out.println(maxAge);
}
```

lambda表达式形式：

```java
Optional<Integer> reduce = list.stream()
        .map(student -> student.getAge())
        .reduce((a, b) -> {
            if (a > b) {
                return a;
            }
            return b;
        });
if(reduce.isPresent()) {
    Integer maxAge = reduce.get();
    System.out.println(maxAge);
}
```

