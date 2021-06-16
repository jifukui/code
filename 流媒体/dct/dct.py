import cv2
import numpy
import matplotlib.pyplot as pyplot
img = cv2.imread("red.jpg")
img = img[0,:,:]
print(img.shape)
img = numpy.float32(img)
img_dct = cv2.dct(img)
print(img_dct.shape)
img_recor2 = cv2.idct(img_dct)
pyplot.imshow(img_recor2)