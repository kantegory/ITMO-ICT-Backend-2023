# Github-Actions


1. Create yml file in ```.github/workflows``` directory 

2. Write in your yml file: 
```yaml
name: learn-github-actions
run-name: ${{ github.actor }} is learning GitHub Actions
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix: 
        node-version: [ 16.x ]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - name: install modules
        run: npm install
      - name: build project 
        run: npm run build  
```

3. Setup ssh keys
```bash
ssh-keygen -m PEM -t rsa -b 4096 -C "your-name-github-secret"
```

4. Copy private key in Github repository secrets variables with ```YOUR_NAME_SSH_PRIVATE_KEY```

<<<<<<< HEAD
5. Copy public key in .ssh/authorized_keys in your remote ssh server

6. Write in yml file new job connected with ssh

```yml
  deploy:
    runs-on: ubuntu-latest
    needs: build 
    steps:
      - name: executing remote ssh server 
        uses: appleboy/ssh-action@master 
        with:
          host: ${{ secrets.HOST_NAME }}
          username: ${{ secrets.USER_NAME }}
          key: ${{ secrets.YOUR_NAME_SSH_PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          script: | 
            cd /path/to/your/app
            git pull origin main 
            git status
``` 

7. Add new secrets variables ```secrets.HOST_NAME```, 
```secrets.USER_NAME```, ```secrets.SSH_PRIVATE_KEY```, 
```secrets.PORT``` in your github repository 
=======
5. Copy public key in .ssh/authorized_keys 
>>>>>>> 357c6620bd1bda6029170fec97222f3a3ba56791
