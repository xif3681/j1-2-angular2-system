#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: shell_cmd.py
    @time: 2016/12/6 9:15
"""
import subprocess


class ShellCmd(object):
    @staticmethod
    def execute_shell_cmd(cmd):
        proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return proc.communicate()[0]

    @staticmethod
    def execute_cmd(cmd):
        return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
