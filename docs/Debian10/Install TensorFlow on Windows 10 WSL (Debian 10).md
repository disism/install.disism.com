---
id: install-tensorflow-on-windows-10-wsl-debain10
title: Install TensorFlow on Windows 10 WSL (Debian 10).
sidebar_label: Windows 10 WSL 安装 TensorFlow (Debian 10).
---

Install TensorFlow on Windows 10 WSL .
In this post, I`ll cover how to cover how to using TensorFlow with CPU/GPU Support on Windows 10 WSL for Deep Learning Development.
To begin with, you need 1) What is TensorFlow? 2) Windows Subsystem for Linux Installation Guide for Windows 10
### 1,Intsall TensorFlow for CPU Support
```
cd /usr/local/
```
```
mkdir tensorflow 
```
```
cd tensorflow
```
### 2,Create a new virtual environment
```
virtualenv -p python3 tfve
```
Activate the virtual environment
```
source tfve/bin/activate
```
Install the TensorFlow

```
pip3 install tensorflow
```
or
```
pip3 install --upgrade tensorflow
```