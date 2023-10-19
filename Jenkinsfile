

def IMAGE_NAME = "_node_backend"
def DEVELOPMENT_HOST = "18.224.88.112"
def USER = "ubuntu"
def TARGET_PATH = "/home/ubuntu/_node_backend"
def RUN_FILE = "_node_backend_run.sh"

pipeline {
  agent any
  stages {
        stage("Clone & Initialize repository") {
            steps {
                script {
                    COMMIT_HASH = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    ENV = sh(script: 'env|sort', returnStdout: true)
                    TAG_NAME = "dev-${COMMIT_HASH}"
                    CONTAINER_NAME = "_node_backend-${COMMIT_HASH}"
                    BUILD_FOLDER = "build-${COMMIT_HASH}"
                }
                sh "whoami"
                sh "ls -al"
                sh "cat /home/jenkins/env_vars/_backend"
                echo sh(script: 'env|sort', returnStdout: true)
                echo "${COMMIT_HASH}"
                echo "${TAG_NAME}"
                echo "${BUILD_FOLDER}"
            }
        }

        stage("Build Image") {
            when { branch "development" }
            steps {
                sh "docker image rm $IMAGE_NAME:$TAG_NAME || true"
                sh "docker build -t $IMAGE_NAME:$TAG_NAME -f Dockerfile ."
            }
        }

        stage("Unit tests") {
            when { branch "development" }
            steps {
                sh "docker stop $CONTAINER_NAME || true"
                sh "docker rm $CONTAINER_NAME || true"
                sh "docker compose -f docker-compose-unit-test.yml build"
                sh "docker compose -f docker-compose-unit-test.yml run kwik_backend"
                sh "docker compose -f docker-compose-unit-test.yml down"
            }
        }

        stage("Publish Artifacts Development") {
            when { branch "development" }
            steps {
                sh "ssh $USER@$DEVELOPMENT_HOST rm -rf $TARGET_PATH/*"
                sh "scp -r ./* $USER@$DEVELOPMENT_HOST:$TARGET_PATH"
                sh "scp -r /home/jenkins/env_vars/_backend $USER@$DEVELOPMENT_HOST:$TARGET_PATH/.env"
            }
        } 
        stage("Restart Development Deployment") {
            when { branch "development" }
            steps {
                sh "scp -r /home/jenkins/$RUN_FILE $USER@$DEVELOPMENT_HOST:/home/ubuntu/"
                sh "ssh $USER@$DEVELOPMENT_HOST bash $RUN_FILE"
            }
        }
    }
}