# Generated by Django 3.1.6 on 2021-02-05 12:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dictionary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lang_from', models.CharField(max_length=100)),
                ('lang_to', models.CharField(max_length=100)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_word', models.CharField(max_length=45)),
                ('translated_word', models.CharField(max_length=45)),
                ('description', models.TextField(null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('dictionary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dictionary.dictionary')),
            ],
        ),
    ]