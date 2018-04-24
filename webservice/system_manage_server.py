#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: system_manage_server.py
    @time: 2016/9/4 8:51
"""
import tornado.ioloop
import tornado.web
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
from arpylibs import langlib
from router import ROUTER


def make_app():
    return tornado.web.Application(ROUTER)

if __name__ == '__main__':
    app = make_app()
    app.listen(10000)

    # 初始化国际化语言
    langlib.init_language(local_path="..")

    tornado.ioloop.IOLoop.current().start()
