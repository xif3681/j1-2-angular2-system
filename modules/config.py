#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: config.py
    @time: 2016/9/22 11:34
"""
BASE_CONFIG = {
    'docker_ip': '127.0.0.1',
    'docker_port': 2376
}

CONTAINER_CONFIG = {
    'anyrobot-etl': {
        'supervisor_port': 9001,
        'services': ['logstash', 'etl_server']
    },
    'anyrobot-manager': {
        'supervisor_port': 9002,
        'services': ['manage_server', 'mysql']
    },
    'anyrobot-store': {
        'supervisor_port': 9003,
        'services': ['elasticsearch']
    },
    'anyrobot-proxy': {
        'supervisor_port': 9004,
        'services': ['nginx']
    },
    'anyrobot-web': {
        'supervisor_port': 9005,
        'services': ['kibana']
    }
}
