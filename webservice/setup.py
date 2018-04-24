#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: setup.py
    @time: 2016/10/18 10:20
"""
import os
import sys

dirname = None
if getattr(sys, 'frozen', False):
    dirname = os.path.dirname(sys.executable)
else:
    dirname = os.path.dirname(os.path.realpath(__file__))
root_path = os.path.dirname(os.path.dirname(dirname))
sys.path.append(root_path + '/anyrobot-pylibs')
sys.path.append(root_path + '/anyrobot-system-manager')
sys.path.append('.')

from cx_Freeze import setup, Executable


# Dependencies are automatically detected, but it might need fine tuning.
buildOptions = dict(packages=['modules'], includes=[], excludes=['collections.sys', 'collections._weakref'])

base = 'Console'
targetName = 'system-manage-server'

executables = [
    Executable(dirname+'/system_manage_server.py', base=base, targetName=targetName)
]

setup(name='webservice',
      version='0.1.0',
      description='anyrobot system manage server',
      options=dict(build_exe=buildOptions),
      executables=executables)
