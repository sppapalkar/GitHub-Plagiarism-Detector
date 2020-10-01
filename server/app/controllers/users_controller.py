from app import db
from app.models.users import User

class UserController:
    @staticmethod
    def new(parameters):
        admin = False
        # Set admin to true if admin parameter is true    
        if parameters['admin'] == 'true':
            admin = True
        
        # Add to db
        if not User.query.filter_by(email=parameters['email']).first():
            user = User(int(parameters['course_id']), parameters['name'], parameters['email'],
                        parameters['password'], admin)
            db.session.add(user)
            db.session.commit()
        else:
            # Duplicate email id, raise value error
            raise ValueError("User with email '{}' already exists".format(parameters['email']))