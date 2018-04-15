import time
from gpiozero import Button, LED

led_01 = LED(22)
led_02 = LED(26)
led_03 = LED(5)
led_04 = LED(6)

status_leds = [led_01, led_02, led_03, led_04]

cup_light = LED(25)

button_led = LED(23)
button = Button(24)
button_reset = Button(12)

relais_01 = DigitalOutputDevice(17)
relais_02 = DigitalOutputDevice(4)

class RoboControl:
	def reset(self):
		button_led.off()
		relais_01.off()
		relais_02.off()
		cup_light.off()
		status_leds_off()

	def status_leds_on():
		for led in status_leds:
			led.on()

	def status_leds_off():
		for led in status_leds:
			led.off()

	def makeKIBA():
		print "KIBA making starts now"
		button_led.on()
		led_01.on()
		relais_01.on()
		time.sleep(1)
		relais_01.off()
		led_02.on()
		relais_02.on()
		time.sleep(1)
		relais_02.off()
		led_03.on()
		print "KIBA poured"
		time.sleep(0.2)
		cup_light.blink()
		time.sleep(5)
		cup_light.off()
		status_leds_off()

	def ready(self, percentage):
		button.when_released = button_led.blink()
		button.when_pressed = makeKIBA
