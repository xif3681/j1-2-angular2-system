node('docker')
{
    stage 'Env'
    sh 'rm -rf ./anyrobot*'

    stage 'Checkout'
    sh 'git clone http://192.168.84.20/bigdata/anyrobot-system-manager.git'
    sh 'git clone http://192.168.84.20/bigdata/anyrobot-pylibs.git'

    sh "rm -rf anyrobot-version && mkdir -p anyrobot-version"
    dir("anyrobot-version") {
        git 'http://192.168.84.20/bigdata/anyrobot-version.git'
    }

    stage 'Gen Version'
    def arversion = load("anyrobot-version/arversion.groovy")
    def ar_version_major = arversion.get_version_major()
    def ar_version_minor = arversion.get_version_minor()
    def ar_version_revision = arversion.get_version_revision()
    def ar_version="${ar_version_major}.${ar_version_minor}.${ar_version_revision}"
    def ar_version_full="${ar_version}.${env.BUILD_ID}"

    stage 'Build'
    dir('anyrobot-system-manager')
    {
        sh 'mkdir anyrobot-system-manager'
        sh "msgfmt ./locale/en_US/LC_MESSAGES/lang.po -o ./locale/en_US/LC_MESSAGES/lang.mo"
        sh "msgfmt ./locale/zh_CN/LC_MESSAGES/lang.po -o ./locale/zh_CN/LC_MESSAGES/lang.mo"
        sh "msgfmt ./locale/zh_TW/LC_MESSAGES/lang.po -o ./locale/zh_TW/LC_MESSAGES/lang.mo"
        sh "rm -rf ./locale/en_US/LC_MESSAGES/lang.po ./locale/zh_CN/LC_MESSAGES/lang.po ./locale/zh_TW/LC_MESSAGES/lang.po"
        sh 'python cli/setup.py build --build-exe=system-manage-cli'
        sh 'python webservice/setup.py build --build-exe=system-manage-webservice'
        sh "echo -e {\\\"major\\\":${ar_version_major}, \\\"minor\\\":${ar_version_minor}, \\\"revision\\\":${ar_version_revision}, \\\"build\\\":\\\"${env.BUILD_ID}\\\", \\\"buildDate\\\":\\\"`date \'+%Y-%m-%d\'`\\\"} > system-manage-webservice/version.json"
        sh 'mv nginx anyrobot-system-manager'
        sh 'mkdir -p anyrobot-system-manager/ui && mv ui/web anyrobot-system-manager/ui'
        sh 'mv system-manage-cli system-manage-webservice locale anyrobot-system-manager'
        sh 'tar zcf anyrobot-system-manager.tar.gz anyrobot-system-manager'
        sh 'mv anyrobot-system-manager.tar.gz ../'

        sh 'git clone http://192.168.84.20/bigdata/anyrobot-tools.git'
        sh 'cp ./anyrobot-tools/errot-status-tools/collect-error-status.py ./utils/error'
        sh 'mkdir -p ./error-code'
        sh 'cp -r anyrobot-system-manager/locale .'
        sh 'cd utils/error && export PYTHONPATH=/home/jenkins/workspace/anyrobot-system-manager/anyrobot-pylibs && python collect-error-status.py -D ../../error-code'
        sh 'tar zcf anyrobot-system-manager-error-code.tar.gz error-code'
        sh 'mv anyrobot-system-manager-error-code.tar.gz ../'
    }

    stage 'Upload To FTP'
    sh "ftp -n<<EOF \n\
        open 192.168.84.21 \n\
        user jenkins eisoo.com \n\
        binary \n\
        cd /ftproot/packages/anyrobot-system-manager \n\
        lcd /home/jenkins/workspace/anyrobot-system-manager \n\
        prompt \n\
        put anyrobot-system-manager.tar.gz anyrobot-system-manager.${ar_version_full}.tar.gz \n\
        put anyrobot-system-manager.tar.gz anyrobot-system-manager.${ar_version}.tar.gz \n\
        cd /ftproot/packages/anyrobot-doc/error-code/ \n\
        put anyrobot-system-manager-error-code.tar.gz \n\
        close \n\
        bye \n\
        EOF"
}
