cd dist
# Allow to fail
npx sequelize db:seed:all || true
node index.js
