# Generated by Django 4.2.5 on 2023-09-21 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
