---
id: linux-unzip
title: Linux 的解压缩
sidebar_label: Linux 的解压缩
---
关于压缩
.tar
解包：
```
tar xvf FileName.tar
```
打包：
```
tar cvf FileName.tar DirName
```
（注：tar 是打包，不是压缩！）
`.gz` 解压1：
```
gunzip FileName.gz
```
解压2：
```
gzip -d FileName.gz
```
压缩：
```
gzip FileName
```
.tar.gz 和 .tgz 解压：
```
tar zxvf FileName.tar.gz
```
压缩：
```
tar zcvf FileName.tar.gz DirName
```
`.zip` 解压：
```
unzip FileName.zip
```
压缩：
```
`zip` FileName.zip DirName
```
`.rar` 解压：
```
rar x FileName.rar
```
压缩：
```
rar a FileName.rar DirName
```
———————————————