# Generated by Django 4.0.4 on 2022-05-07 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dongdongapp', '0004_alter_post_post_id_alter_post_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='meeting_date',
            field=models.DateTimeField(null=True),
        ),
    ]
