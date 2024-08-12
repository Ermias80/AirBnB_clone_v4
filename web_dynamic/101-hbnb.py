#!/usr/bin/python3
"""
Description: this module runs a Flask web application that serves a dynamic
web page related to the HBNB project. It retrieves data from a storage engine,
sorts it, and passes it to a template.
"""

import uuid
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template

app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error) -> None:
    """
    At the end of each web request, it removes the current SQLAlchemy.
    """
    storage.close()

@app.route('/101-hbnb/', strict_slashes=False)
def hbnb() -> str:
    """
    Route that serves a dynamic web page.
    """
    states = sorted(storage.all(State).values(), key=lambda k: k.name)
    st_ct = [[state, sorted(state.cities, key=lambda k: k.name)]
             for state in states]

    amenities = sorted(storage.all(Amenity).values(), key=lambda k: k.name)

    places = sorted(storage.all(Place).values(), key=lambda k: k.name)

    cache_id = uuid.uuid4()

    return render_template('4-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    Main function that runs the Flask web application.
    """
    app.run(host='0.0.0.0', port=5000)
