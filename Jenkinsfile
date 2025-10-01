pipeline {
    agent any
    stages {
        stage('Build') {
          steps {
            sh 'bun install'
            sh 'bun run build'
          }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}