import time
from gpiozero import Button, LED

# LED_01 = 23
button_led = LED(23)
button = Button(24)

class RoboControl:
	def reset(self):
		button_led.off()

	def ready(self):
		button.when_pressed = button_led.on
		button.when_released = button_led.off
