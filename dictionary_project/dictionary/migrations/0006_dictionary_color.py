# Generated by Django 3.1.6 on 2021-02-06 12:24

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0005_remove_dictionary_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='dictionary',
            name='color',
            field=colorfield.fields.ColorField(default='#FFFFFF', max_length=18),
        ),
    ]