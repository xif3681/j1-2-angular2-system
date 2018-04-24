#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: ar_service_manager.py
    @time: 2016/9/7 10:13
"""
from arpylibs.base_error import ARBaseError
from modules.ar_container_manager import ARContainerManager, ARContainerStatus
from config import BASE_CONFIG, CONTAINER_CONFIG
from utils.error.ar_exception import ARServiceException
from utils.error.status_pool import ServiceStatusPool
import xmlrpclib
import socket


def deco_deal_excp(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except xmlrpclib.Fault:
            raise ARServiceException(ServiceStatusPool.ID_OPERATE_SERVICE_EXIST_FAULT)
        except socket.error:
            raise ARServiceException(ServiceStatusPool.ID_LINK_ERROR)
        except ARBaseError as e:
            raise e
        except Exception:
            raise ARServiceException(ServiceStatusPool.ID_SERVER_ERROR)

    return wrapper


class ARServiceStatus(object):
    RUNNING = 'RUNNING'
    STARTING = 'STARTING'
    STOPPING = 'STOPPING'
    STOPPED = 'STOPPED'
    FATAL = 'FATAL'
    EXITED = 'EXITED'
    BACKOFF = 'BACKOFF'

    @staticmethod
    def code(status):
        if status == ARServiceStatus.RUNNING:
            return 0
        elif status == ARServiceStatus.STARTING:
            return 1
        elif status == ARServiceStatus.STOPPING:
            return 2
        elif status == ARServiceStatus.STOPPED:
            return 3
        elif status == ARServiceStatus.FATAL:
            return 4
        elif status == ARServiceStatus.EXITED:
            return 5
        elif status == ARServiceStatus.BACKOFF:
            return 6


class ARServiceManager(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(ARServiceManager, cls).__new__(cls, *args)
        return cls._instance

    @deco_deal_excp
    def __init__(self, container):
        self._server = xmlrpclib.Server('http://{0}:{1}/RPC2'.
                                        format(BASE_CONFIG['docker_ip'],
                                               CONTAINER_CONFIG[container]['supervisor_port']))
        self._container = container

    @staticmethod
    @deco_deal_excp
    def all():
        containers_names = ARContainerManager.get_all_containers_names()
        all_services = []

        for container in containers_names:
            for service in ARServiceManager(container).list():
                all_services.append(service)

        return all_services

    @deco_deal_excp
    def list(self):
        results = []
        status = ARContainerManager().status(self._container)['status']
        services = CONTAINER_CONFIG[self._container]['services']

        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            for service in services:
                service_info = self._server.supervisor.getProcessInfo(service)
                service_stats = self.stats(service)
                results.append({
                    'pid': service_info['pid'],
                    'name': service_info['name'],
                    'cpu_percent': service_stats['cpu_percent'],
                    'mem_percent': service_stats['mem_percent'],
                    'status': ARServiceStatus.code(service_info['statename']),
                    'container': self._container
                })

            return results

        for service in services:
            results.append({
                'pid': -1,
                'name': service,
                'cpu_percent': 0.0,
                'mem_percent': 0.0,
                'status': ARServiceStatus.code(ARServiceStatus.EXITED),
                'container': self._container
            })

        return results

    @deco_deal_excp
    def status(self, service_name):
        status = ARContainerManager().status(self._container)['status']
        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            process_info = self._server.supervisor.getProcessInfo(service_name)
            return {
                'pid': process_info['pid'],
                'name': process_info['name'],
                'status': ARServiceStatus.code(process_info['statename']),
                'container': self._container
            }

        return {
            'pid': -1,
            'name': service_name,
            'status': ARServiceStatus.code(ARServiceStatus.EXITED),
            'container': self._container
        }

    @deco_deal_excp
    def start(self, service_name):
        status = ARContainerManager().status(self._container)['status']
        current_service_info = self.status(service_name)

        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            if current_service_info['status'] in [ARServiceStatus.code(ARServiceStatus.STOPPED),
                                                  ARServiceStatus.code(ARServiceStatus.EXITED)]:
                self._server.supervisor.startProcess(service_name)
                current_service_info = self.status(service_name)
            elif current_service_info['status'] == ARServiceStatus.code(ARServiceStatus.RUNNING):
                pass
            elif current_service_info['status'] == ARServiceStatus.code(ARServiceStatus.FATAL):
                raise ARServiceException(ServiceStatusPool.ID_SERVICE_STATUS_IN_FATAL)

        service_stats = self.stats(service_name)

        return {
            'pid': current_service_info['pid'],
            'name': service_name,
            'status': current_service_info['status'],
            'cpu_percent': service_stats['cpu_percent'],
            'mem_percent': service_stats['mem_percent'],
            'container': self._container
        }

    @deco_deal_excp
    def stop(self, service_name):
        status = ARContainerManager().status(self._container)['status']
        current_service_info = self.status(service_name)
        service_status = current_service_info['status']

        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            if service_status in [ARServiceStatus.code(ARServiceStatus.RUNNING),
                                  ARServiceStatus.code(ARServiceStatus.STARTING)]:
                self._server.supervisor.stopProcess(service_name)
            elif service_status in [ARServiceStatus.code(ARServiceStatus.STOPPED),
                                    ARServiceStatus.code(ARServiceStatus.EXITED)]:
                pass
            elif service_status == ARServiceStatus.code(ARServiceStatus.FATAL):
                raise ARServiceException(ServiceStatusPool.ID_SERVICE_STATUS_IN_FATAL)

        service_current_status = self.status(service_name)['status']
        service_stats = self.stats(service_name)

        return {
            'pid': current_service_info['pid'],
            'name': service_name,
            'status': service_current_status,
            'cpu_percent': service_stats['cpu_percent'],
            'mem_percent': service_stats['mem_percent'],
            'container': self._container
        }

    @deco_deal_excp
    def restart(self, service_name):
        self.stop(service_name)
        return self.start(service_name)

    @staticmethod
    def get_service_cpu_mem_percent(container, service_pid):
        import subprocess
        command = "docker exec %s ps --pid=%s -u | grep %s | awk '{print $3,$4}'" \
                  % (container, service_pid, service_pid)
        handle = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        result = []

        for element in handle.communicate()[0].split(' '):
            result.append(element.strip())

        return result

    @deco_deal_excp
    def stats(self, service_name):
        status = ARContainerManager().status(self._container)['status']
        current_service_info = self.status(service_name)

        if status == ARContainerStatus.code(ARContainerStatus.RUNNING):
            pid = current_service_info['pid']
            service_status = current_service_info['status']
            if service_status == ARServiceStatus.code(ARServiceStatus.RUNNING):
                cpu_mem_percent = ARServiceManager.get_service_cpu_mem_percent(
                    self._container, pid)

                return {
                    'pid': pid,
                    'name': service_name,
                    'cpu_percent': cpu_mem_percent[0],
                    'mem_percent': cpu_mem_percent[1],
                    'container': self._container
                }

        return {
            'pid': current_service_info['pid'],
            'name': service_name,
            'cpu_percent': 0.0,
            'mem_percent': 0.0,
            'container': self._container
        }
