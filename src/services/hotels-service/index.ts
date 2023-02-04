import { notFoundError } from "@/errors";
import { paymentRequiredError } from "@/errors/payment-required-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room, TicketStatus } from "@prisma/client";

async function getHotels(userId: number): Promise<(Hotel & { Rooms: Room[] })[]> {
  await verifyEnrollAndTicketWithHotelPaid(userId);
  return await hotelRepository.getHotels();
}

async function getHotelById(userId: number, id: number): Promise<(Hotel & { Rooms: Room[] })> {
  await verifyEnrollAndTicketWithHotelPaid(userId);
  const hotel = await hotelRepository.getHotelById(id);
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

async function verifyEnrollAndTicketWithHotelPaid(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  } else {
    if (ticket.status !== TicketStatus.PAID) {
      throw paymentRequiredError();
    }
    if (ticket.TicketType.isRemote) {
      throw paymentRequiredError();
    }
    if (!ticket.TicketType.includesHotel) {
      throw paymentRequiredError();
    }
  }
}

const hotelService = {
  getHotels,
  getHotelById,
};

export default hotelService;
