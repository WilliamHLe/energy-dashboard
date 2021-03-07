set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$DB_USERNAME',
  pwd: '$DB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF
