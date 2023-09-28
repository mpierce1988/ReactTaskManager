import json
from django.http import JsonResponse
from .models import User, Task
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
def hello(request):
    return JsonResponse({"status": "Success", "message": "Hello, world!"})

@csrf_exempt
def register(request):
    try:
        if request.method == 'POST':
            # parse the JSON body
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Validate email is unique
            if User.objects.filter(email = email).exists():
                return JsonResponse({"status": "UniqueError", "message": "Email already exists"}, status=400)

            # Validate name, email and password were provided
            if not (name and email and password):
                return JsonResponse({"status": "Error", "message": "Name, email and password are required"}, status=400)
            
            hashed_password = make_password(password)
            user = User(name = name, email = email, password = hashed_password)
            user.save()
            return JsonResponse({"status": "Success" })
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    
@csrf_exempt
def login(request):
    try:
        if request.method == 'POST':
            # parse JSON from request body
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')

            # Validate email and password were provided
            if not (email and password):
                return JsonResponse({"status": "Error", "message": "Email and password are required"}, status=400)
            
            # Validate user exists and password matches
            try:
                user = User.objects.get(email = email)
                if not check_password(password, user.password):
                    return JsonResponse({"status": "Error", "message": "Invalid credentials"}, status=400)
                else:
                    return JsonResponse({"status": "Success", "user": {"id": user.id, "name": user.name, "email": user.email}}, status=200)
            except User.DoesNotExist:
                return JsonResponse({"status": "Error", "message": "Invalid credentials"}, status=400)
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    
@csrf_exempt
def tasks_view(request, user_id):
    if request.method == 'GET':
        return get_tasks(request, user_id)
    elif request.method == 'POST':
        return add_task(request, user_id)
    else:
        return JsonResponse({"status": "Error", "message": "Method not allowed"}, status=405)
    
@csrf_exempt
def task_view(request, user_id, task_id):
    if request.method == 'GET':
        return get_task(request, user_id, task_id)
    elif request.method == 'PATCH':
        return update_task(request, user_id, task_id)
    elif request.method == 'DELETE':
        return delete_task(request, user_id, task_id)
    else:
        return JsonResponse({"status": "Error", "message": "Method not allowed"}, status=405)
    


def get_task(request, user_id, task_id):
    try:
        task = Task.objects.get(user__id = user_id, id = task_id)        
        
        return JsonResponse({"status": "Success", "task": {"id": task.id, "userId": task.user.id, "name": task.name, "description": task.description}}, status=200)
    except Task.DoesNotExist:
        return JsonResponse({"status": "Error", "message": "Task not found"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    

def get_tasks(request, user_id):
    try:
        # double underscore traverses relationships
        # user specifies the user field in Task model
        # double underscore specifies access value on related user
        tasks = Task.objects.filter(user__id = user_id)

        # use list comprehension to convert list of tasks to a list of dictionaries
        tasks_list = [{ "id": task.id, "userId": task.user.id, "name": task.name, "description": task.description} for task in tasks]

        return JsonResponse({"status": "Success", "tasks": tasks_list}, status=200)

    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)

def add_task(request, user_id):
    try:
        # parse JSON from request body
        data = json.loads(request.body.decode('utf-8'))

        # validate name and description were provided
        if not (data.get('name') and data.get('description')):
            return JsonResponse({"status": "Error", "message": "Name and description are required"}, status=400)
        
        # validate user exists
        user = User.objects.get(id = user_id)
        
        
        # create task
        name = data.get('name')
        description = data.get('description')
        task = Task(user = user, name = name, description = description)
        task.save()

        return JsonResponse({"status": "Success", "task": {"id": task.id, "userId": task.user.id, "name": task.name, "description": task.description}}, status=201)
    except User.DoesNotExist:
        return JsonResponse({"status": "Error", "message": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    
def update_task(request, user_id, task_id):
    try:
        # validate the task exists
        task = Task.objects.get(user__id = user_id, id = task_id)        
        

        # parse JSON from request body
        data = json.loads(request.body.decode('utf-8'))

        # if a name was provided in the request body, update the task name
        if data.get('name'):
            task.name = data.get('name')

        # if a description was provided in the request body, update the task description
        if data.get('description'):
            task.description = data.get('description')

        # save the task
        task.save()

        # return success message with updated task information
        return JsonResponse({"status": "Success", "task": {"id":task.id, "userId":task.user.id, "name":task.name, "description":task.description}}, status=200)

    except Task.DoesNotExist:
        return JsonResponse({"status": "Error", "message": "Task not found"}, status=404)    
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    
def delete_task(request, user_id, task_id):
    try:
        # validate the task exists
        task = Task.objects.get(user__id = user_id, id = task_id)


        task_details = {
            "id": task.id,
            "userId": task.user.id,
            "name": task.name,
            "description": task.description
        }

        # delete the task
        task.delete()

        # return success message
        return JsonResponse({"status":"Success", "task": task_details}, status=200)
    except Task.DoesNotExist:
        return JsonResponse({"status": "Error", "message": "Task not found"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "Error", "message": str(e)}, status=500)
    
    


