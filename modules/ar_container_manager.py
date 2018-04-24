#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: ar_container_manager.py
    @time: 2016/9/2 11:31
"""

from docker import Client
from docker.errors import NotFound
from requests.exceptions import ConnectionError
from arpylibs.base_error import ARBaseError
from modules.config import BASE_CONFIG, CONTAINER_CONFIG
from utils.error.ar_exception import ARContainerException
from utils.error.status_pool import ContainerStatusPool


def deco_deal_excep(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except NotFound:
            raise ARContainerException(ContainerStatusPool.ID_CONTAINER_DOES_NOT_EXIST)

        except ConnectionError:
            raise ARContainerException(ContainerStatusPool.ID_DOCKER_SERVICE_CAN_NOT_LINK)

        except ARBaseError as e:
            raise e

        except Exception:
            raise ARContainerException(ContainerStatusPool.ID_SERVER_ERROR)

    return wrapper


class ARContainerStatus(object):
    RUNNING = 'running'
    RESTARTING = 'restarting'
    PAUSED = 'paused'
    EXITED = 'exited'
    DEAD = 'dead'

    @staticmethod
    def code(status):
        if status == ARContainerStatus.RUNNING:
            return 0
        elif status == ARContainerStatus.RESTARTING:
            return 1
        elif status == ARContainerStatus.PAUSED:
            return 2
        elif status == ARContainerStatus.EXITED:
            return 3
        elif status == ARContainerStatus.DEAD:
            return 4


class ARContainerManager(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(ARContainerManager, cls).__new__(cls, *args)
            base_url = 'tcp://{0}:{1}'.format(BASE_CONFIG['docker_ip'],
                                              BASE_CONFIG['docker_port'])
            cls._instance._docker_client = Client(base_url=base_url)
        return cls._instance

    @staticmethod
    def get_all_containers_names():
        return CONTAINER_CONFIG.keys()

    @staticmethod
    @deco_deal_excep
    def get_all_containers_ids():
        containers_names = ARContainerManager.get_all_containers_names()
        containers_ids = []

        for container in containers_names:
            container_id = ARContainerManager().get_container_id_and_name(container
                                                                          )['container_id']
            containers_ids.append(container_id)
            containers_ids.append(container_id[0:12])

        return containers_ids

    @staticmethod
    @deco_deal_excep
    def get_container_name(container):
        return ARContainerManager().get_container_id_and_name(container)['container_name']

    @deco_deal_excep
    def list(self):
        container_list = []

        for container in ARContainerManager.get_all_containers_names():
            id_and_name = self.get_container_id_and_name(container)
            container_id = id_and_name['container_id']
            container_stats = self.stats(container_id)

            container_list.append({
                'id': id_and_name['container_id'],
                'name': id_and_name['container_name'],
                'status': self.status(container_id)['status'],
                'cpu_percent': container_stats['cpu_percent'],
                'mem_percent': container_stats['mem_percent'],
                'services': CONTAINER_CONFIG[container]['services']
            })

        return container_list

    @deco_deal_excep
    def status(self, container_id_or_name):
        container_info = self._docker_client.inspect_container(container_id_or_name)
        container_id_and_name = self.get_container_id_and_name(container_id_or_name)

        return {
            'id': container_id_and_name['container_id'],
            'name': container_id_and_name['container_name'],
            'status': ARContainerStatus.code(container_info['State']['Status'])
        }

    @deco_deal_excep
    def start(self, container_id_or_name):
        status = self.status(container_id_or_name)['status']

        if status in [ARContainerStatus.code(ARContainerStatus.RUNNING),
                      ARContainerStatus.code(ARContainerStatus.RESTARTING)]:
            self._docker_client.restart(container_id_or_name)
        elif status == ARContainerStatus.code(ARContainerStatus.EXITED):
            self._docker_client.start(container_id_or_name)
        elif status == ARContainerStatus.code(ARContainerStatus.PAUSED):
            self._docker_client.unpause(container_id_or_name)
            self._docker_client.restart(container_id_or_name)
        elif status == ARContainerStatus.code(ARContainerStatus.DEAD):
            raise ARContainerException(ContainerStatusPool.ID_CONTAINER_IN_DEAD)

        container_id_and_name = self.get_container_id_and_name(container_id_or_name)
        container_current_status = self.status(container_id_or_name)['status']
        container_stats = self.stats(container_id_or_name)

        return {
            'id': container_id_and_name['container_id'],
            'name': container_id_and_name['container_name'],
            'status': container_current_status,
            'cpu_percent': container_stats['cpu_percent'],
            'mem_percent': container_stats['mem_percent']
        }

    @deco_deal_excep
    def stop(self, container_id_or_name):
        import requests
        url = 'http://{0}:{1}/containers/{2}/stop'.format(BASE_CONFIG['docker_ip'],
                                                          BASE_CONFIG['docker_port'],
                                                          container_id_or_name)
        status = self.status(container_id_or_name)['status']

        if status in [ARContainerStatus.code(ARContainerStatus.RUNNING),
                      ARContainerStatus.code(ARContainerStatus.RESTARTING)]:
            requests.post(url=url)
        elif status == ARContainerStatus.code(ARContainerStatus.EXITED):
            pass
        elif status == ARContainerStatus.code(ARContainerStatus.PAUSED):
            self._docker_client.unpause(container_id_or_name)
            requests.post(url=url)
        elif status == ARContainerStatus.code(ARContainerStatus.DEAD):
            raise ARContainerException(ContainerStatusPool.ID_CONTAINER_IN_DEAD)

        container_id_and_name = self.get_container_id_and_name(container_id_or_name)
        container_current_status = self.status(container_id_or_name)['status']
        container_stats = self.stats(container_id_or_name)

        return {
            'id': container_id_and_name['container_id'],
            'name': container_id_and_name['container_name'],
            'status': container_current_status,
            'cpu_percent': container_stats['cpu_percent'],
            'mem_percent': container_stats['mem_percent']
        }

    def restart(self, container_id_or_name):
        self.stop(container_id_or_name)
        return self.start(container_id_or_name)

    @staticmethod
    def calculate_cpu_percent(cpu_stats_pre, cpu_stats_now):
        cpu_total_usage_pre = cpu_stats_pre['cpu_stats']['cpu_usage']['total_usage']
        cpu_system_usage_pre = cpu_stats_pre['cpu_stats']['system_cpu_usage']
        cpu_total_usage_now = cpu_stats_now['cpu_stats']['cpu_usage']['total_usage']
        cpu_system_usage_now = cpu_stats_now['cpu_stats']['system_cpu_usage']
        percpu_usage = cpu_stats_now['cpu_stats']['cpu_usage']['percpu_usage']
        cpu_total_usage_delta = cpu_total_usage_now - cpu_total_usage_pre
        cpu_system_usage_delta = cpu_system_usage_now - cpu_system_usage_pre
        cpu_percent = (float(cpu_total_usage_delta) / float(cpu_system_usage_delta)
                       ) * len(percpu_usage) * 100

        return float('%.2f' % cpu_percent)

    @staticmethod
    def calculate_mem_percent(cpu_stats_now):
        mem_usage = cpu_stats_now['memory_stats']['usage']
        mem_limit = cpu_stats_now['memory_stats']['limit']
        mem_percent = (float(mem_usage) / float(mem_limit)) * 100

        return float('%.2f' % mem_percent)

    @deco_deal_excep
    def stats(self, container_id_or_name):
        status = self.status(container_id_or_name)['status']
        container_id_and_name = self.get_container_id_and_name(container_id_or_name)

        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            container_stats_obj = self._docker_client.stats(container_id_or_name)
            import json
            cpu_stats_pre = json.loads(container_stats_obj.next())
            cpu_stats_now = json.loads(container_stats_obj.next())
            cpu_percent = ARContainerManager.calculate_cpu_percent(cpu_stats_pre,
                                                                   cpu_stats_now)
            mem_percent = ARContainerManager.calculate_mem_percent(cpu_stats_now)

            return {
                'id': container_id_and_name['container_id'],
                'name': container_id_and_name['container_name'],
                'cpu_percent': cpu_percent,
                'mem_percent': mem_percent
            }
        elif status == ARContainerStatus.code(ARContainerStatus.DEAD):
            raise ARContainerException(ContainerStatusPool.ID_CONTAINER_IN_DEAD)

        return {
            'id': container_id_and_name['container_id'],
            'name': container_id_and_name['container_name'],
            'cpu_percent': 0.0,
            'mem_percent': 0.0
        }

    @deco_deal_excep
    def get_container_id_and_name(self, container_id_or_name):
        container_info = self._docker_client.inspect_container(container_id_or_name)

        return {
            'container_id': container_info['Id'],
            'container_name': container_info['Name'][1:]
        }
