# Generated by Django 5.1.2 on 2025-01-22 07:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0006_remove_product_discountprice_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="shippingPrice",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=15, null=True
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="taxPrice",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=15, null=True
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="totalPrice",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=15, null=True
            ),
        ),
    ]
