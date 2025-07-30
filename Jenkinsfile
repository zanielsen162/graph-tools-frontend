

pipeline {
  environment {
    IMAGE_NAME = "zanielsen162/graph-tools-frontend"
    dockerImage = ""
  }
  agent any

  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/zanielsen162/graph-tools-frontend.git'
      }
    }

    stage('Build image') {
      steps {
        script {
          dockerImage = docker.build IMAGE_NAME
        }
      }
    }

    stage('Pushing Image') {
        environment {
            registryCredential = 'docker-personal'
        }
        steps {
            script {
                docker.withRegistry('https://registry.hub.docker.com', registryCredential ) {
                    dockerImage.push("latest")
                }
            }
        }
    }

    stage('Deploying Container to Kubernetes') {
        steps {
            script {
                kubernetesDeploy(configs: "k8s/deployment.yaml", "k8s/service.yaml")
            }
        }
    }

  }

}