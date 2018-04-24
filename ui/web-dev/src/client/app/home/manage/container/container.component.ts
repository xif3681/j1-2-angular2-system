import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NameListService} from '../../../server/index';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Code } from './Code/index';


export const CODES: Code[] = [
  {id: 3758227460, name: 'container does not exist',enName:'容器不存在'},
  {id: 3758227457, name: 'docker service can not link',enName:'Docker服务连接失败'},
  {id: 3758227459, name: 'container in dead',enName:'容器处于异常状态'},
  {id: 3758227458, name: 'server error',enName:'容器级服务错误'},
  {id: 3758292994, name: 'operate service exist fault',enName:'操作服务发生错误'},
  {id: 3758292993, name: 'link error',enName:'连接supervisor服务失败'},
  {id: 3758292995, name: 'service status in fatal',enName:'服务处于异常状态'},
  {id: 3758292996, name: 'server error',enName:'服务错误'},
  {id: 3758161922, name: 'argument null',enName:'参数为空'},
  {id: 3758161921, name: 'argument error',enName:'参数错误'}
];

/**
 * This class represents the lazy loaded ManagerComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ar-container',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.css'],
  providers: [NgbAlertConfig]
})

export class ContainerComponent implements OnInit {
  errorMessage: string;
  containerNames:any[] = [];
  serverNames:any[] = [];
  containerOrServer = {
    container: {
      enName : 'containers',
      name:'容器管理'
    },
    server: {
      enName : 'services',
      name: '服务管理'
    }
  };
  tHeadContainerNames = [
    '序号',
    '名称',
    '状态',
    'CPU占有率',
    '内存占有率',
    '操作'
  ];
  tHeadServerNames = [
    '序号',
    '名称',
    '所属容器',
    '状态',
    'CPU占有率',
    '内存占有率',
    '操作'
  ];
  prompt:string;
  codes:any;
  /**
   * Creates an instance of the ManageComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService,public alertConfig: NgbAlertConfig) {
    // alertConfig.dismissible = true;
    setInterval(()=>{ this.getNames()},60000)

  }
  /**
   * 初始化的时候获取数据
   */
  ngOnInit() {
    this.getNames();

  }
  /**
   * 从服务器获取数据
   */
  getNames(): void {
    this.codes = CODES;
    this.nameListService.getContainer()
        .then(
           containerNames => {
             //成功获取数据，里面有pid为-1的情况
             this.containerNames = containerNames;
           },
           error => {
             this.errorMessage = <any>error;
           }
         );

    this.nameListService.getServer()
        .then(
            serverNames => {
              //成功获取数据，里面有pid为-1的情况
              this.serverNames = serverNames;
            },
            error => {
              this.errorMessage = <any>error;

            }
          );
  }

}
