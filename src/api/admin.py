  
import os
from flask_admin import Admin
from .models import db, User, Asset, Liability, UserPreferences
from flask_admin.contrib.sqla import ModelView

from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin, expose


class UserAdmin(ModelView):
    # List the columns you want to display in the admin panel
    column_list = ('username', 'phone', 'email','preferences.text_notification', 'preferences.text_frequency', 'password')

    # Optional: Customize how the columns are displayed (e.g., labels)
    column_labels = {
        'username': 'Username',
        'phone': 'Phone',
        'email': 'Email',
        'preferences.text_notification': 'Receives Texts',
        'preferences.text_frequency': 'Text Frequency',
        'password': 'Password',
        
    }
    column_auto_select_related = True
def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'
    admin = Admin(app, name='Finances Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(ModelView(Asset, db.session))
    admin.add_view(ModelView(Liability, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))