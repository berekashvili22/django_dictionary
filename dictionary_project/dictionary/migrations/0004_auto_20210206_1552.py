# Generated by Django 3.1.6 on 2021-02-06 11:52

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0003_dictionary_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dictionary',
            name='color',
            field=colorfield.fields.ColorField(default='#fa5333', max_length=18),
        ),
    ]
