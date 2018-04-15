import RPi.GPIO as GPIO, time, os, subprocess

GPIO.setmode(GPIO.BCM)

LED_01 = 23

class RoboControl:
	def __init__(self):
		GPIO.setup(RESET, GPIO.IN)
		GPIO.setup(CUP_LIGHT, GPIO.OUT)
		GPIO.setup(LED_01, GPIO.OUT)
		self.reset

	def reset():
	  GPIO.output(LED_01, False)

	def light(self, timer: int):
  		while(true):
  			GPIO.output(LED_01, True)
			time.sleep(timer)
			GPIO.output(LED_01, False)
			time.sleep(timer)