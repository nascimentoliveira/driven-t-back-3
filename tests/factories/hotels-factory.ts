import faker from "@faker-js/faker";
import { Hotel, Room } from "@prisma/client";
import { prisma } from "@/config";

export function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: params.name || faker.name.findName(),
      image: params.image || faker.image.imageUrl(),
    },
  });
}

export function createRoom(params: Partial<Room> = {}): Promise<Room> {
  return prisma.room.create({
    data: {
      name: params.name || faker.lorem.sentence(),
      capacity: params.capacity || faker.datatype.number({ min: 1, max: 3 }),
      hotelId: params.hotelId,
    },
  });
}
