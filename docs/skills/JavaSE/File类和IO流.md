# File类和IO流
## File类
> File类是文件和目录（文件夹）路径名的抽象表达形式。File类不关心例如“这个路径合不合法”，“这个路径下是否有这个文件”等问题。甚至还可以粗暴地认为：File类对象就是存储了一个文件（目录）路径字符串的对象。在创建File类对象时，不管如何创建，都不会产生任何异常，任何问题，只有在用这个File类对象操作文件时，才有可能出现。

```java
//创建File对象
File file = new File("D:/1/1.text");
//判断该文件/目录是否存在
boolean exist = file.exists();
//判断该对象是否是文件
boolean judgeFile = file.isFile();
//判断该对象是否是文件夹
boolean judgeDir = file.isDirectory();
```
windows系统路径名格式：D:\1\1.text（但是也可以按Unix系统格式写）
类Unix系统路径名格式：D:/1/1.text

```java
//如果该文件不存在
if(!file.exists) {
    //创建文件
    file.createNewFile()    
}
```

```java
File file = new File("D:/1/1");
if(!file.exists()) {
    //创建目录（可以创建多层，mkdir只能创建单层）
    file.mkdirs();
}
```

```java
//如果file为目录，则该目录必须为空才能删除。
//删除成功返回true，失败返回false
file.delete();
```

```java
//原文件路径
File file = new File("D:/1/1.txt);
//移动且重命名的路径
File destFile = new File("D:/2/2.txt");
boolean flag = file.rennameTo(dextFile);
```
```java
//获取绝对路径
file.getAbsolutePath();
//获取创建File对象时使用的路径名
file.getPath();
//获取文件或目录名字
file.getName();
//获取文件大小，返回值为long
file.length();
//最后修改的时间，表现形式是时间戳（毫秒值）
file.lastModified();
```
```java
//获取该目录下的所有文件夹和文件的名字，返回值是String
public String list();
//获取该目录下的所有文件夹和文件的名字，返回值是File对象数组
public File[] listFiles();
```
文件过滤器
FileFilter接口
```java
@FunctionalInterface
public interface FileFilter {
 boolean accept(File pathname);
}
```
使用带过滤器的listFiles()方法：
```java
```

## IO流
### 字节流
#### FileOutputStream 
```java
FileOutputSteam out = new FileOutputStream("a.txt", true);
out.write(97);
out.write("你好吗？".getByte());
```
write用法：
write(int b)
write(byte[] b)
write(byte[] b, int off, int len)

#### FileInputStream
方式一：按单字节读取
```java
FileImputStream in = new FileInputStream("D:/1/1.txt");
int readData;
while((readData = in.read()) != -1) [
    System.out.println(readData);
]
```
方式二：按多字节读取
```java
FileInputStream in = new FileInputStream("D:/1/1.txt");
byte[] bytes = new byte[1024];
int readCount;
while((readCount = in.read(bytes)) != -1) {
    System.out.println(new String(bytes, 0, readCount))
}
```

#### FileInputStream和FileOutputStream实现文件复制
```java
FileInputStream in = new FileInputStream("D:/1/a.txt");
FileOutputStream out = new FileOutputStream("D:/1/b.txt");
byte[] bytes = new byte[1024];
int readCount;
while((readCount = in.read(bytes)) != -1) {
    out.write(bytes, 0, readCount);
}
in.close();
out.close();
```
#### BufferedOutputStream
```java
BufferedOutputStream out = new BufferOutputStream(new FileOutputStream("D:/1/1.txt"));
out.write("你好吗？".getBytes());
```
#### BufferedInputStream
方式一：按单字节读取
```java
BufferInputStream in = new BufferInputStream(new FileInputStream("D:/1/1.txt"))
int readData;
while((readData = in.read()) != -1) {
    System.out.println(readData);
}
```

方式二：按多字节读取
```java
BufferedInputStream in = BufferedInputStream(new FileInutStream("D:/1/1.txt"));
byte[] bytes = new byte[1024];
int readCount;
while((readCount = in.read(bytes)) != -1) {
    System.out.println(new String(bytes, 0, readCount))
}
```
#### BufferedInputStream和BufferedOutputStream实现文件复制
```java
BufferedInputStream in = new BufferedInputStream(new FileInutStream("D:/1/a.txt"));
BufferedOutputStream out = new BufferedOutputStream(new FileInutStream("D:/1/b.txt"));
byte[] bytes = new byte[1024];
int readCount;
while((readCount = in.read(bytes)) != -1) {
    out.write(bytes, 0, readCount);
}
in.close();
out.close();
```
### 字符流
1. **OutputStreamWriter**
write方法可以传入字符、字符数组、字符串，以及可以确定写入指定字符串的范围，和字符数组的范围。
```java
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream("D:/1/1.txt", true))；
out.write('c');
out.write("你在干嘛呢？".toCharArray());
out.write("你在干嘛呢？");
```
2. **InputStreamReader**
```java
InputStreamReader in = new InputStreamReader(new FileInputStream("D:/1/1.txt"));
```

3. **FileWriter简化流**
实际上就是将
```java
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream("D:/1/1.txt", true))；
```
简化成了：
```java
FileWriter out = new FileWriter("D:/1/1.txt");
```
4. **FileReader简化流**
实际上是将
```java
InputStreamReader in = new InputStreamReader(new FileInputStream("D:/1/1.txt"));
```
简化成了
```java
FileReader in = fnew FileReader("D:/1/1.txt");
```
**包装流**

### 哪些输出流需要使用flush()方法
一般来说，带有缓冲区的输出流都可以调用flush()方法。
字节流
- BufferedOutputStream
- ObjectOutputStream

字符流
- OutputStreamWriter
- PrintWriter
- FileWriter
- BufferedWriter

触发缓冲区刷新的条件：
1. 调用flush()方法手动刷新
2. 调用close()方法关闭流
3. 缓冲区装满了会自动刷新