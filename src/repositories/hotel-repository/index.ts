import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

function getHotels(): Promise<(Hotel & { Rooms: Room[] })[]> {
  return prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

function getHotelById(id: number): Promise<(Hotel & { Rooms: Room[] })> {
  return prisma.hotel.findUnique({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  getHotels,
  getHotelById,
};

export default hotelRepository;
