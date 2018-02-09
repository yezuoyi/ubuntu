# ubuntu
soft for ubuntu
一、Linux下删除文件和文件夹常用命令如下：
删除文件： rm file
删除文件夹： rm -rf dir
需要注意的是， rmdir 只能够删除 空文件夹 。

二、删除制定文件（夹）之外的所有文件呢？
1、方法1，比较麻烦的做法是：
  复制需要保留的文件到其他文件夹，然后将该目录删除， 然后将需要保留的移动 回来。
  mv keep ../ #保留文件（夹） keep
  rm -rf * #删除当前文件夹里的所有文件
  mv ../keep ./ #将原来的东西移动回来

2、方法2，需要在当前文件夹中进行:
  rm -rf !(keep) #删除keep文件之外的所有文件
   rm -rf !(keep1 | keep2) #删除keep1和keep2文件之外的所有文件

3、方法3，当前文件夹中结合使用grep和xargs来处理文件名：
  ls | grep -v keep | xargs rm #删除keep文件之外的所有文件
说明： ls先得到当前的所有文件和文件夹的名字， grep -v keep，进行grep正则匹配查找keep，-v参数决定了结果为匹配之外的结果，也就是的到了keep之外的所有文件名，然后 xargs用于从 标准输入获得参数 并且传递给后面的命令，这里使用的命令是 rm，然后由rm删除前面选择的文件。
好处：使用了grep来正则表达式来匹配文件名字，可以一次保留多个文件，从而进行更加准确的处理。

4、方法4，使用find命令代替ls，改进方法3从而能够处理制定文件夹的文件：
find ./test/ | grep -v keep | xargs rm #删除当前test文件夹中keep文件之外的所有文件
说明，用grep而不用find -name选取名字，因为find选取名字时比较麻烦，对正则表达式支持不够，无法排除指定文件名。

5、方法5，直接使用find命令删除其他文件：
find ./ -name '[^k][^e][^e][^p]*'  -exec rm -rf {} \; #删除keep以外的其他文件。
find ./ -name '[^k][^e][^e][^p]*'  | xargs rm -rf  #删除keep以外的其他文件。推荐！
说明：上面第二行的代码效率高些，原因在于删除多个文件时 -exec会启动多个进程来处理，而xargs会启动一个rm进程来处理。
关于find 执行命令的效率和借用xargs启动的命令效率的比较，详情请参考： http://www.linuxsir.org/main/?q=node/137 
Linux文件查找命令find,xargs详述   http://www.linuxsir.org/main/?q=node/137
