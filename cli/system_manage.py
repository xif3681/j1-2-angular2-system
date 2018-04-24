#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: system_manage.py
    @time: 2016/9/28 13:23
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

from cmd import Cmd
from modules.config import CONTAINER_CONFIG
from modules.ar_container_manager import ARContainerManager
from modules.ar_service_manager import ARServiceManager
from modules.ar_version_manager import ARVersionManager

CONTAINERS_NAMES = None
CONTAINERS_IDS = None
PROMT = []
CMDS = []


def deco_deal_exp(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print str(e)

    return wrapper


class CLI(Cmd):
    def __init__(self):
        Cmd.__init__(self)
        self.prompt = '>>> '
        global CONTAINERS_NAMES, CONTAINERS_IDS
        CONTAINERS_NAMES = CLI.get_all_containers_names()
        CONTAINERS_IDS = CLI.get_all_containers_ids()

    def default(self, line):
        pass

    def do_help(self, arg):
        pass

    @staticmethod
    def help():
        element_number_in_promp_list = CLI.get_prefix(PROMT)['num']

        if element_number_in_promp_list == 0:
            """
                >>> help
            """
            print 'Usage:\t[container] [service] [command]\n' \
                  '\tcontainer  valid container_name or container_id\n' \
                  '\tservice    service_name, ensure service in container\n' \
                  '\tcommand    list, status, start, restart, stop, stats\n\n' \
                  'Example\n' \
                  '\tEntry container, please input:\n' \
                  '\t\tcontainer_name\n' \
                  '\t\tcontainer_id\n\n' \
                  '\tEntry service in specified container, please input:\n' \
                  '\t\tcontainer_name service_name\n' \
                  '\t\tcontainer_id service_name\n\n' \
                  '\tExecute container command, please input:\n' \
                  '\t\tcontainer_name command\n' \
                  '\t\tcontainer_id command\n\n' \
                  '\tExecute service command in specified container, please input:\n' \
                  '\t\tcontainer_name service_name command\n' \
                  '\t\tcontainer_id service_name command\n\n' \
                  '\tDisplay all containers informations\n' \
                  '\t\tlist\n\n' \
                  '\tSee help informations, please input:\n' \
                  '\t\thelp\n\n' \
                  '\tBack to the root level, please input:\n' \
                  '\t\tanyrobot\n\n' \
                  '\tExit, please input:\n' \
                  '\t\texit\n'
        elif element_number_in_promp_list == 1:
            """
                container>>> help
            """
            print 'Usage:\t[container] [service] [command]\n' \
                  '\tcontainer  valid container_name or container_id\n' \
                  '\tservice    service_name, ensure service in container\n' \
                  '\tcommand    list, status, start, restart, stop, stats\n\n' \
                  'Example\n' \
                  '\tEntry container, please input:\n' \
                  '\t\tcontainer_name\n' \
                  '\t\tcontainer_id\n\n' \
                  '\tEntry service in specified container, please input:\n' \
                  '\t\tcontainer_name service_name\n' \
                  '\t\tcontainer_id service_name\n\n' \
                  '\tEntry service in current container, please input:\n' \
                  '\t\tservice_name\n\n' \
                  '\tExecute specified container command, please input:\n' \
                  '\t\tcontainer_name command\n' \
                  '\t\tcontainer_id command\n\n' \
                  '\tExecute container command, please input:\n' \
                  '\t\tcommand\n\n' \
                  '\tExecute service command in specified container, please input:\n' \
                  '\t\tcontainer_name service_name command\n' \
                  '\t\tcontainer_id service_name command\n\n' \
                  '\tExecute service command in current container, please input:\n' \
                  '\t\tservice_name command\n\n' \
                  '\tDisplay all services in current container\n' \
                  '\t\tlist\n\n' \
                  '\tSee help informations, please input:\n' \
                  '\t\thelp\n\n' \
                  '\tBack to the root level, please input:\n' \
                  '\t\tanyrobot\n\n' \
                  '\tExit, please input:\n' \
                  '\t\texit\n'
        elif element_number_in_promp_list == 2:
            """
                service>>>
            """
            print 'Usage:\t[container] [service] [command]\n' \
                  '\tcontainer  valid container_name or container_id\n' \
                  '\tservice    service_name, ensure service in container\n' \
                  '\tcommand    list, status, start, restart, stop, stats\n\n' \
                  'Example\n' \
                  '\tEntry container, please input:\n' \
                  '\t\tcontainer_name\n' \
                  '\t\tcontainer_id\n\n' \
                  '\tEntry service in specified container, please input:\n' \
                  '\t\tcontainer_name service_name\n' \
                  '\t\tcontainer_id service_name\n\n' \
                  '\tEntry service in current container, please input:\n' \
                  '\t\tservice_name\n\n' \
                  '\tExecute container command, please input:\n' \
                  '\t\tcontainer_name command\n' \
                  '\t\tcontainer_id command\n' \
                  '\tExecute service command in container, please input:\n' \
                  '\t\tcontainer_name service_name command\n' \
                  '\t\tcontainer_id service_name command\n\n' \
                  '\tExecute service command, please input:\n' \
                  '\t\tcommand\n' \
                  '\tDisplay all containers informations\n' \
                  '\t\tlist\n\n' \
                  '\tSee help informations, please input:\n' \
                  '\t\thelp\n\n' \
                  '\tBack to the root level, please input:\n' \
                  '\t\tanyrobot\n\n' \
                  '\tExit, please input:\n' \
                  '\t\texit\n'

    @staticmethod
    def error_message():
        print 'Input Error. Please input help to see'

    @staticmethod
    def get_all_containers_names():
        return ARContainerManager.get_all_containers_names()

    @staticmethod
    @deco_deal_exp
    def get_all_containers_ids():
        return ARContainerManager.get_all_containers_ids()

    @staticmethod
    def parse_input_value(input_value):
        global CMDS
        CLI.clear_list(CMDS)
        values = input_value.strip().split(' ')
        for value in values:
            if value:
                CMDS.append(value)

        return CMDS

    @staticmethod
    def validate_container_and_service(*args):
        args_num = len(args)
        if args_num == 1:
            container = args[0]
            if container in CONTAINERS_NAMES or (CONTAINERS_IDS and
                                                 container in CONTAINERS_IDS):
                return True
        elif args_num == 2:
            container = args[0]
            service = args[1]
            if container in CONTAINERS_NAMES:
                if service in CONTAINER_CONFIG[container]['services']:
                    return True
            elif CONTAINERS_IDS and container in CONTAINERS_IDS:
                container_name = ARContainerManager.get_container_name(container)
                if service in CONTAINER_CONFIG[container_name]['services']:
                    return True

        return False

    @staticmethod
    @deco_deal_exp
    def execute(command, service=None, container=None):
        if command == 'list':
            if container is not None and service is None:
                container = ARContainerManager.get_container_name(container)
                print ARServiceManager(container).list()
            else:
                print ARContainerManager().list()
        elif command == 'status':
            if container is not None and service is None:
                print ARContainerManager().status(container)
            elif container is not None and service is not None:
                print ARServiceManager(container).status(service)
        elif command == 'start':
            if container is not None and service is None:
                print ARContainerManager().start(container)
            elif container is not None and service is not None:
                print ARServiceManager(container).start(service)
        elif command == 'stop':
            if container is not None and service is None:
                print ARContainerManager().stop(container)
            elif container is not None and service is not None:
                print ARServiceManager(container).stop(service)
        elif command == 'restart':
            if container is not None and service is None:
                print ARContainerManager().restart(container)
            elif container is not None and service is not None:
                print ARServiceManager(container).restart(service)
        elif command == 'stats':
            if container is not None and service is None:
                print ARContainerManager().stats(container)
            elif container is not None and service is not None:
                print ARServiceManager(container).stats(service)
        elif command == 'version':
            print ARVersionManager().get_all_version()

    @staticmethod
    def validate_command(command):
        if command in ['list', 'status', 'start', 'stop', 'restart', 'stats', 'version']:
            return True

        return False

    @staticmethod
    def get_prefix(prompt_list):
        prompt_list_num = len(prompt_list)

        if prompt_list_num == 1:
            return {
                'num': 1,
                'current_container': prompt_list[0]
            }
        elif prompt_list_num == 2:
            return {
                'num': 2,
                'current_container': prompt_list[0],
                'current_service': prompt_list[1]
            }

        return {
            'num': 0
        }

    @staticmethod
    def clear_list(list_sample):
        if not list_sample:
            return list_sample
        if list_sample:
            list_sample.pop()
        CLI.clear_list(list_sample)

    def precmd(self, arg):
        global PROMT
        inputs = CLI.parse_input_value(arg)
        inputs_num = len(inputs)
        prefixs = CLI.get_prefix(PROMT)

        if inputs_num == 0:
            pass
        elif inputs_num == 1:
            if inputs[0] == 'anyrobot':
                """
                    输入anyrobot，回到第一级目录
                """
                CLI.clear_list(PROMT)
                self.prompt = '>>> '
            elif inputs[0] == 'list':
                if len(PROMT) == 1:
                    CLI.execute('list', None, PROMT[0])
                else:
                    CLI.execute('list')
            elif inputs[0] == 'version':
                CLI.execute('version')
            elif inputs[0] == 'exit':
                pass
            else:
                if prefixs['num'] == 0:
                    """
                        >>> anyrobot-manager
                        仅验证container
                    """
                    if CLI.validate_container_and_service(inputs[0]):
                        PROMT.append(inputs[0])
                        self.prompt = inputs[0] + '>>> '
                    elif inputs[0] == 'help':
                        CLI.help()
                    else:
                        CLI.error_message()
                elif prefixs['num'] == 1:
                    """
                        anyrobot-manager>>>
                        验证当前container下是否含有这个service
                    """
                    container = prefixs['current_container']
                    if CLI.validate_command(inputs[0]):
                        CLI.execute(inputs[0], None, container)
                    elif CLI.validate_container_and_service(inputs[0]):
                        PROMT.pop()
                        PROMT.append(inputs[0])
                        self.prompt = inputs[0] + '>>> '
                    elif CLI.validate_container_and_service(container, inputs[0]):
                        PROMT.append(inputs[0])
                        self.prompt = inputs[0] + '>>> '
                    elif inputs[0] == 'help':
                        CLI.help()
                    else:
                        CLI.error_message()
                elif prefixs['num'] == 2:
                    """
                        mysql>>>
                        验证是否为status，start，stop，restart等命令
                    """
                    if CLI.validate_command(inputs[0]):
                        CLI.execute(inputs[0], prefixs['current_service'],
                                    prefixs['current_container'])
                    elif CLI.validate_container_and_service(inputs[0]):
                        CLI.clear_list(PROMT)
                        PROMT.append(inputs[0])
                        self.prompt = inputs[0] + '>>> '
                    elif inputs[0] in CONTAINER_CONFIG[prefixs['current_container']]['services']:
                        PROMT.pop()
                        PROMT.append(inputs[0])
                        self.prompt = inputs[0] + '>>> '
                    elif inputs[0] == 'help':
                        CLI.help()
                    else:
                        CLI.error_message()
        elif inputs_num == 2:
            if CLI.validate_container_and_service(inputs[0]) and \
                    CLI.validate_command(inputs[1]):
                CLI.execute(inputs[1], None, inputs[0])
            elif CLI.validate_container_and_service(inputs[0], inputs[1]):
                CLI.clear_list(PROMT)
                PROMT.append(inputs[0])
                PROMT.append(inputs[1])
                self.prompt = inputs[1] + '>>> '
            elif prefixs['num'] == 1:
                if CLI.validate_container_and_service(prefixs['current_container'], inputs[0]) \
                        and CLI.validate_command(inputs[1]):
                    CLI.execute(inputs[1], inputs[0], prefixs['current_container'])
                else:
                    CLI.error_message()
            else:
                CLI.error_message()

        elif inputs_num == 3:
            if CLI.validate_container_and_service(inputs[0], inputs[1]) and \
                    CLI.validate_command(inputs[2]):
                CLI.execute(inputs[2], inputs[1], inputs[0])
            else:
                CLI.error_message()
        else:
            CLI.error_message()

        return arg

    def do_exit(self, arg):
        return True

if __name__ == '__main__':
    cli = CLI()
    cli.cmdloop()
