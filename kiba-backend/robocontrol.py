import time
from gpiozero import Button, LED, OutputDevice

led_01 = LED(26)
led_02 = LED(13)
led_03 = LED(6)
led_04 = LED(5)

status_leds = [led_01, led_02, led_03, led_04]

button_led = LED(23)
button = Button(24)
button_reset = Button(12)

cup_light = OutputDevice(25, active_high=False)
relais_01 = OutputDevice(17, active_high=False)
relais_02 = OutputDevice(4, active_high=False)

class RoboControl:
	def __init__(self):
		self.reset()

	def reset(self):
		relais_01.off()
		relais_02.off()
		button_led.off()
		cup_light.off()
		self.status_leds_off()
		print "RoboControl reset complete"

	def status_leds_on(self):
		for led in status_leds:
			led.on()

	def status_leds_off(self):
		for led in status_leds:
			led.off()

	def makeKIBA(self, percentage):
		sleepytime = 3.8/100*percentage

		print "KIBA making starts now with percentage", percentage
		button_led.on()
		led_01.on()
		time.sleep(2)
		led_02.on()
		relais_01.on()
		print "sleeping for ", sleepytime
		time.sleep(sleepytime)
		relais_01.off()
		led_03.on()
		relais_02.on()
		print "sleeping for ", 3.8-sleepytime
		time.sleep(3.8-sleepytime)
		relais_02.off()
		led_04.on()
		print "KIBA poured"
		time.sleep(2)
		cup_light.on()
		time.sleep(5)
		cup_light.off()
		button_led.off()
		self.status_leds_off()
		print "KIBA process finished"

	def ready(self, percentage):
		button.when_released = button_led.blink()
		button.when_pressed = lambda : self.makeKIBA(percentage)
