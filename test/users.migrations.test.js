process.env.NODE_ENV = 'test';

const assert = require( 'chai' ).assert;
const {
  suite,
  test
} = require( 'mocha' );
const knex = require( '../knex.js' );
const { addDatabaseHooks } = require( './utils.js' )
suite( 'users migrations', addDatabaseHooks( () => {
  test( 'users columns', ( done ) => {
    knex( 'users' ).columnInfo()
      .then( ( actual ) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'users_id_seq\'::regclass)'
          },

          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          username: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },

          access: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'registered\'::character varying'
          },

          email: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          hashed_password: {
            type: 'character',
            maxLength: 60,
            nullable: false,
            defaultValue: null
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          }
        };

        for ( const column in expected ) {
          assert.deepEqual(
            actual[ column ],
            expected[ column ],
            `Column ${column} is not the same`
          );
        }
        done();
      })
      .catch( ( err ) => {
        done( err );
      });
  });
}));
